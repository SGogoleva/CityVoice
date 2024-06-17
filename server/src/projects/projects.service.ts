import { ProjectsModel } from "../models/models";
import { Pagination } from "../types/pagination";
import { Project } from "../types/projects";

export const projectService = {
  getProjectsPaginated: async ({
    page,
    limit,
    sortBy,
    sortOrder,
    cityId,
  }: Pagination) => {
    try {
      const sort: Record<string, 1 | -1> = {};
      if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
      }

      const filter: Record<string, string> = {};
      if (cityId) {
        filter['city.cityId'] = String(cityId);
      }

      // const sortedProjects = await ProjectsModel.find(filter).sort(sortBy && sortOrder ? sort : {}).exec();
      // const paginatedProjects = sortedProjects.slice((page - 1) * limit, page * limit);

      const result = await ProjectsModel.find(filter)
        .sort(sortBy && sortOrder ? sort : {})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const count = await ProjectsModel.countDocuments(filter);

      const city = await ProjectsModel.aggregate([
        // { $group: { _id: "$city.cityId", cityName: { $first: "$city.cityName" } } },
        // { $project: { _id: 0, cityId: "$_id", cityName: 1 } }
        { $group: { _id: "$city.cityId", cityName: { $first: "$city.cityName" } } },
        { 
          $lookup: {
            from: "cities", // The name of the City collection
            localField: "_id", // Field from the Projects collection to match
            foreignField: "cityId", // Field from the City collection to match
            as: "cityDetails"
          }
        },
        { $unwind: "$cityDetails" }, // Unwind the array from $lookup
        { 
          $project: {
            _id: 0,
            cityId: "$_id",
            cityName: 1,
            latitude: "$cityDetails.latitude",
            longitude: "$cityDetails.longitude"
          }
        }
      ]);

      return {
        result,
        currentLimit: limit,
        totalEntries: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        city
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

  getProjectByCity: async (cityId: string) => {
    try {
      const projects = await ProjectsModel.find({ "city.cityId": cityId });
      return projects;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  postVoteCounts: async ({ projectId, questionText, optionText }: Project) => {
    try {
      const project = await projectService.getProjectById(projectId);
      let questionFound = false;
      let optionFound = false;

      project?.questionnaire.forEach((question) => {
        if (question.questionText === questionText) {
          questionFound = true;
          question.options.forEach((option) => {
            if (option.optionText === optionText) {
              optionFound = true;
              option.voteCount += 1;
            }
          });
        }
      });
      return {
        project,
        questionFound: questionFound,
        optionFound: optionFound,
      };
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};
