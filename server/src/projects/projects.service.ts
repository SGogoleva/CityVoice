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
};
