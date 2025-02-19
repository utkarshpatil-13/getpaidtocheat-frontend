import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchYoutubeContents, fetchPayoutHistory, fetchSocialMediaAccount } from '../../../services/dashboard.services';
import { fetchSubscription } from '../../../services/subscription.services';

interface DashboardState {
  metrics: any[];
  payouts: any[];
  subscription: any | null;
  socialAccounts: any[];
  youtubeAuthRequired: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: [],
  payouts: [],
  subscription: null,
  socialAccounts: [],
  youtubeAuthRequired: true,
  loading: false,
  error: null,
};

// Async Thunks
export const loadYoutubeMetrics = createAsyncThunk('dashboard/loadYoutubeMetrics', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchYoutubeContents();
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) return rejectWithValue('YouTube authorization required');
    throw err;
  }
});

export const loadPayoutHistory = createAsyncThunk('dashboard/loadPayoutHistory', fetchPayoutHistory);
export const loadSubscription = createAsyncThunk('dashboard/loadSubscription', fetchSubscription);
export const loadSocialAccounts = createAsyncThunk('dashboard/loadSocialAccounts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchSocialMediaAccount();
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) return rejectWithValue('YouTube authorization required');
    throw err;
  }
});

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadYoutubeMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadYoutubeMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload || [];
        state.youtubeAuthRequired = false;
      })
      .addCase(loadYoutubeMetrics.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadSocialAccounts.rejected, (state) => {
        state.loading = false;
        state.youtubeAuthRequired = true;
      })
      .addCase(loadPayoutHistory.fulfilled, (state, action) => {
        state.payouts = action.payload || [];
      })
      .addCase(loadSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })
      .addCase(loadSocialAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.youtubeAuthRequired = false;
        const newAccounts = action.payload || [];
        state.socialAccounts = [...state.socialAccounts, newAccounts];
      })
  },
});

export default dashboardSlice.reducer;
