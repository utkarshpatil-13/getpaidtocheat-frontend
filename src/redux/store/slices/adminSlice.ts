import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Interfaces
interface User {
  id: string;
  username: string;
  email: string;
}

interface UserState {
  users: User[];
  content: any[]; // To store YouTube content
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  users: [],
  content: [], // Default value for YouTube content
  loading: false,
  error: null,
};

// Async Thunk to Fetch Users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://getpaidtocheat-backend.onrender.com/api/user'); // Replace with your API endpoint
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return rejectWithValue('Failed to fetch users');
  }
});

// Async Thunk to Load YouTube Content
export const loadYoutubeContent = createAsyncThunk(
  'admin/loadYoutubeContent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://getpaidtocheat-backend.onrender.com/api/youtube/userid/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching YouTube content:', error);
      return rejectWithValue('Failed to load YouTube content');
    }
  }
);

// Admin Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Load YouTube Content
      .addCase(loadYoutubeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadYoutubeContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload; // Store YouTube content in the state
      })
      .addCase(loadYoutubeContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
