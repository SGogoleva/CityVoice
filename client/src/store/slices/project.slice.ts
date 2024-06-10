import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { previewProjectThunk } from "../thunks/project.thunk";
import { ProjectPreview } from "../../types/project";

interface ProjectsState {
  projects: ProjectPreview[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // appendProjects(state, action: PayloadAction<ProjectPreview[]>) {
    //   state.projects = [...state.projects, ...action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(previewProjectThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(previewProjectThunk.fulfilled, (state, action) => {
        console.log({ P: action.payload });
        console.log({ L: state.projects.length });
        const seen = new Set();
        const arr = [...state.projects, ...action.payload.projects];
        console.log({ arr });
        const uniques = arr.filter((p) => {
          const duplicate = seen.has(p._id);
          seen.add(p._id);
          return !duplicate;
        });
        console.log({ uniques });
        // state.projects = [...state.projects, ...action.payload.projects];
        state.projects = uniques;
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
export const { setPage } = projectsSlice.actions;
