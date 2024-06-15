import { Request, Response, NextFunction } from "express";
import { projectService } from "./projects.service";

export const getProjectsPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    if (!page || !limit) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }
    const projects = await projectService.getProjectsPaginated({
      page: +page,
      limit: +limit,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc"
    });
    return res.status(201).json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid projectId" });
    }
    const project = await projectService.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
  }
};

export const getProjectVotes = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid projectId" });
    }
    const projectVotes = await projectService.getProjectVotes(id);
    res.status(200).json(projectVotes);
  } catch (error) {
    console.log(error);
  }
};

export const getProjectByCity = async (req: Request, res: Response) => {
  try {
    const { cityId } = req.params;
    if (!cityId) {
      return res.status(400).json({ message: "Invalid cityId" });
    }
    const project = await projectService.getProjectByCity(cityId);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
  }
};

export const postVoteCounts = async (req: Request, res: Response) => {
  try {
    const { projectId, questionText, optionText } = req.body;
    const project = await projectService.postVoteCounts({
      projectId,
      questionText,
      optionText,
    });
    if (!project.project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!project.questionFound) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (!project.optionFound) {
      return res.status(404).json({ message: "Option not found" });
    }

    await project.project.save();
    res.status(200).json({ message: "Vote counted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Vote has not been updated" });
  }
};
