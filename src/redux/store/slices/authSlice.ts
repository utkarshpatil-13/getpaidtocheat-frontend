import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
  discordId: string;
  avatarUrl?: string;
  stripeCustomerId?: string;
  stripeAccountId?: string;
  stripeAccountStatus?: string;
  subscription?: any; // Adjust as per your Subscription model
  socialAccounts?: any[]; // Adjust as per your SocialMediaAccount model
  videos?: any[]; // Adjust as per your Content model
  payouts?: any[]; // Adjust as per your Payout model
  rewards?: any[]; // Adjust as per your Reward model
  ipAddress: string;
  refreshToken?: string;
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
  transactions?: any[]; // Adjust as per your Transaction model
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  ready: boolean; // To indicate if the app has finished loading user data
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  ready: false,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('auth/fetchUser', async (token: string) => {
  const response = await fetch('https://getpaidtocheat-backend.onrender.com/api/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data = await response.json();
  return data.data; // Assuming your API returns user data in `data.data`
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.ready = false;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.ready = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.ready = true; // Mark app as ready even if fetching user failed
      });
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
