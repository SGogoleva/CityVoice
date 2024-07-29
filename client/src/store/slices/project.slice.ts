import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { previewProjectThunk } from "../thunks/project.thunk";
import { ProjectPreview } from "../../types/project";

interface ProjectsState {
  projects: ProjectPreview[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc" | '';
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  sortBy: '',
  sortOrder: '',
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.currentPage = 1;
      state.projects = [];
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
      state.currentPage = 1;
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(previewProjectThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(previewProjectThunk.fulfilled, (state, action) => {
        if (state.currentPage === 1) {
          state.projects = action.payload.projects;
        } else {
          state.projects = [...state.projects, ...action.payload.projects];
        }
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(previewProjectThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch projects";
        state.loading = false;
      });
  },
});

export default projectsSlice.reducer;
export const { setPage, setSortBy, setSortOrder } = projectsSlice.actions;
