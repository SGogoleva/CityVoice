import { Request, Response, NextFunction } from "express";
import { projectService } from "./projects.service";

export const getProjectsPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    if (!page || !limit) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }
    // const pageNumber = parseInt(page as string, 10);
    // const limitNumber = parseInt(limit as string, 10);
    // if (pageNumber < 1 || limitNumber <= 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Page must be more than 1, limit higher than 0" });
    // }
    const projects = await projectService.getProjectsPaginated({
      page: +page,
      limit: +limit,
    });
    return res.status(201).json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
