import { ProjectsModel } from "../models/models";
import { Pagination } from "../types/pagination";
import { Project } from "../types/projects";

export const projectService = {
  getProjectsPaginated: async ({ page, limit, sortBy, sortOrder }: Pagination) => {
    try {
      const sort: Record<string, 1 | -1> = {};
      if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
      }
      const sortedProjects = await ProjectsModel.find().sort(sortBy && sortOrder ? sort : {}).exec();
      const paginatedProjects = sortedProjects.slice((page - 1) * limit, page * limit);

      // const result = await ProjectsModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit)
      //   .sort(sortBy && sortOrder ? sort : {})
      //   .exec();

      const count = await ProjectsModel.countDocuments();

      return {
        result: paginatedProjects,
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

  getProjectByCity: async (cityId: string) => {
    try {
      const projects = await ProjectsModel.find({ "city.cityId": cityId });
      return projects;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  postVoteCounts: async ( {projectId, questionText, optionText}: Project ) => {
    try {
      const project = await projectService.getProjectById(projectId);
      let questionFound = false;
      let optionFound = false;
  
      project?.questionnaire.forEach(question => {
        if (question.questionText === questionText) {
          questionFound = true;
          question.options.forEach(option => {
            if (option.optionText === optionText) {
              optionFound = true;
              option.voteCount += 1;
            }
          });
        }
      });
  return {project, questionFound: questionFound, optionFound: optionFound}
    
    } catch (error) {
      console.error(error);
      return {};
    }
  }
};