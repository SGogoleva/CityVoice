import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectPreview } from "../../types/project";
import { get3LastProjectsThunk } from "../thunks/project.thunk";

interface ProjectsState {
  projects: ProjectPreview[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const last3ProjectsSlice = createSlice({
  name: "last3Projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get3LastProjectsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(get3LastProjectsThunk.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        state.loading = false;
      })
      .addCase(get3LastProjectsThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch projects";
        state.loading = false;
      });
  },
});

export default last3ProjectsSlice.reducer;
