import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { singleProjectThunk } from '../thunks/project.thunk';
import { Project } from '../../types/project';

interface SingleProjectState {
  loading: boolean;
  project: Project | null;
  error: string | null;
}

const initialState: SingleProjectState = {
  loading: false,
  project: null,
  error: null,
};

const singleProjectSlice = createSlice({
  name: 'singleProject',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(singleProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleProjectThunk.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(singleProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project data';
      });
  },
});

export default singleProjectSlice.reducer;
