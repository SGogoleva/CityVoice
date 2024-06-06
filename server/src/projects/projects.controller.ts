import { Request, Response, NextFunction } from "express";
import { projectService } from "./projects.service";

export const getProjectsPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    if (!page || !limit) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }
    const projects = await projectService.getProjectsPaginated({
      page: +page,
      limit: +limit,
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
