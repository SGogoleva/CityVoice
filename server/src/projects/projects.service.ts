import { ProjectsModel } from "../models/models";
import { Pagination } from "../types/pagination";

export const projectService = {
  getProjectsPaginated: async ({ page, limit }: Pagination) => {
    try {
      const result = await ProjectsModel.aggregate([
        {
          $facet: {
            projects: [
                { $skip: (page - 1) * limit }, 
                { $limit: limit }
            ],
            totalCount: [
                { $count: "count" }
            ],
          },
        },
      ]);

      return {
        projects: result[0].projects,
        totalCount: result[0].totalCount[0].count,
      };
    } catch (error) {
      console.error(error);
      return {
        projects: [],
        totalCount: 0,
      };
    }
  },
};
