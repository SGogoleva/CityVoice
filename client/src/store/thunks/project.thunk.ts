import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectPreview } from "../../types/project";
import { Pagination } from "../../types/pagination";
import { getProjectsPaginated, postVote } from "../../http";
import { getProjectData } from "../../http";

export const previewProjectThunk = createAsyncThunk<
  { projects: ProjectPreview[]; totalPages: number },
  Pagination,
  { rejectValue: Error }
>("projects/fetchProjectsPaginated", async ({ limit, page, sortBy, sortOrder }: Pagination) => {
  return await getProjectsPaginated({ limit, page, sortBy, sortOrder });
});

export const singleProjectThunk = createAsyncThunk(
  "projects/fetchById",
  async (projectId: string) => {
    return await getProjectData(projectId);
  }
);

export const postVoteThunk = createAsyncThunk(
  "voting/postVote",
  async ({ projectId, questionText, optionText }: { projectId: string; questionText: string; optionText: string }) => {
    return await postVote({ projectId, questionText, optionText });
  }
);
