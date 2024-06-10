import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectPreview } from "../../types/project";
import { Pagination } from "../../types/pagination";
import { getProjectsPaginated } from "../../http";

export const previewProjectThunk = createAsyncThunk<
  { projects: ProjectPreview[], totalPages: number },
  Pagination,
  { rejectValue: Error }
>("projects/fetchProjectsPaginated", async ({ limit, page }: Pagination) => {
  return await getProjectsPaginated({ limit, page });
});
