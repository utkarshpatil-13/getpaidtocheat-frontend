import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadVideoToBackend } from "../../../services/content.services";

interface ContentState {
  uploadProgress: number;
  videoDetails: { title: string; videoUrl: string } | null;
  isUploading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  uploadProgress: 0,
  videoDetails: null,
  isUploading: false,
  error: null,
};

export const uploadVideo = createAsyncThunk<
  any, // Replace `any` with the type of your API response if known
  { file: File; title: string; description: string },
  { rejectValue: string } // Type for error message
>(
  "video/uploadVideo",
  async ({ file, title, description }, { dispatch, rejectWithValue }) => {
    try {
      const response = await uploadVideoToBackend(file, title, description, (progressEvent) => {
        const total = progressEvent.total || 1; // Prevent division by zero
        const progress = Math.round((progressEvent.loaded * 100) / total);
        dispatch(setUploadProgress(progress));
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Video upload failed");
    }
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isUploading = false;
        state.videoDetails = action.payload;
        state.uploadProgress = 0; // Reset progress
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUploadProgress } = contentSlice.actions;

export default contentSlice.reducer;
