import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { singleMessageThunk } from '../thunks/message.thunk';
import { message } from '../../types/messages';

interface SingleMessageState {
  loading: boolean;
  message: message | null;
  error: string | null;
}

const initialState: SingleMessageState = {
  loading: false,
  message: null,
  error: null,
};

const singleMessageSlice = createSlice({
  name: 'singleMessage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleMessageThunk.fulfilled, (state, action: PayloadAction<message>) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(singleMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch message data';
      });
  },
});

export default singleMessageSlice.reducer;
