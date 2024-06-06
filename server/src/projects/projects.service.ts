import { ProjectsModel } from "../models/models";
import { Pagination } from "../types/pagination";

export const projectService = {
  getProjectsPaginated: async ({ page, limit }: Pagination) => {
    try {
      const result = await ProjectsModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const count = await ProjectsModel.countDocuments();

      return {
        result,
        currentLimit: limit,
        totalEntries: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getProjectById: async (projectId: string) => {
    try {
      const project = await ProjectsModel.findById(projectId);
      return project;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getProjectVotes: async (projectId: string) => {
    try {
      const project = await projectService.getProjectById(projectId);
      const projectVotes = project?.questionnaire;
      return projectVotes;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

