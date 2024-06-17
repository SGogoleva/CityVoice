import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectPreview } from "../../types/project";
import { Pagination } from "../../types/pagination";
import { get3LastProjects, getProjectsPaginated, postVote } from "../../http";
import { getProjectData } from "../../http";

export const previewProjectThunk = createAsyncThunk<
  {
    cities: any;
    projects: ProjectPreview[];
    totalPages: number;
  },
  Pagination,
  { rejectValue: Error }
>(
  "projects/fetchProjectsPaginated",
  async ({ limit, page, sortBy, sortOrder, cityId }: Pagination) => {
    return await getProjectsPaginated({
      limit,
      page,
      sortBy,
      sortOrder,
      cityId,
    });
  }
);

export const singleProjectThunk = createAsyncThunk(
  "projects/fetchById",
  async (projectId: string) => {
    return await getProjectData(projectId);
  }
);

export const postVoteThunk = createAsyncThunk(
  "voting/postVote",
  async ({
    projectId,
    questionText,
    optionText,
  }: {
    projectId: string;
    questionText: string;
    optionText: string;
  }) => {
    return await postVote({ projectId, questionText, optionText });
  }
);

export const get3LastProjectsThunk = createAsyncThunk(
  "projects/getLast3",
  async () => {
    return await get3LastProjects();
  }
);
