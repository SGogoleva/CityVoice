import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectPreview, ProjectVotes } from "../../types/project";
import { Pagination } from "../../types/pagination";
import { get3LastProjects, getProjectsPaginated, postVote } from "../../http";
import { getProjectData } from "../../http";

export const previewProjectThunk = createAsyncThunk<
  { projects: ProjectPreview[]; totalPages: number },
  Pagination,
  { rejectValue: Error }
>(
  "projects/fetchProjectsPaginated",
  async ({ limit, page, sortBy, sortOrder }: Pagination) => {
    return await getProjectsPaginated({
      limit,
      page,
      sortBy,
      sortOrder,
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
    votes,
    userId,
  }: ProjectVotes) => {
    return await postVote({ projectId, votes, userId });
  }
);

export const get3LastProjectsThunk = createAsyncThunk(
  "projects/getLast3",
  async () => {
    return await get3LastProjects();
  }
);
