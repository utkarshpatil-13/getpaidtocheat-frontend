// Redux Slice for Subscription Management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cancelSubscription, fetchSubscription, renewSubscription } from '../../../services/subscription.services';

interface SubscriptionState {
  subscriptionActive: boolean;
  subscriptionData: {
    userId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    productId: string;
    planId: string;
    status: string;
    paymentStatus: string;
    startDate: string;
    endDate: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptionActive: false,
  subscriptionData: null,
  loading: false,
  error: null,
};

// Async Thunk to load subscription details
export const loadSubscriptionDetails = createAsyncThunk(
  'subscription/loadSubscriptionDetails',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSubscription();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to load subscription details');
    }
  }
);

// Async Thunk to cancel a subscription
export const cancelUserSubscription = createAsyncThunk(
  'subscription/cancelSubscription',
  async (stripeSubscriptionId: string, { rejectWithValue }) => {
    try {
      await cancelSubscription(stripeSubscriptionId);
    } catch (error) {
      return rejectWithValue('Failed to cancel subscription');
    }
  }
);

// Async Thunk to renew a subscription
export const renewUserSubscription = createAsyncThunk(
  'subscription/renewSubscription',
  async (stripeSubscriptionId: string, { rejectWithValue }) => {
    try {
      const renewedSubscription = await renewSubscription(stripeSubscriptionId);
      return renewedSubscription;
    } catch (error) {
      return rejectWithValue('Failed to renew subscription');
    }
  }
);

// Subscription Slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSubscriptionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSubscriptionDetails.fulfilled, (state, action) => {
        state.loading = false;
        
        if(action.payload && action.payload.paymentStatus === 'canceled' && action.payload.status === 'canceled'){
          state.subscriptionActive = false;
          state.subscriptionData = action.payload;
        }
        else if (action.payload) {
          state.subscriptionActive = true;
          state.subscriptionData = action.payload;
        } 
        else {
          state.subscriptionActive = false;
          state.subscriptionData = null;
        }
      })
      .addCase(loadSubscriptionDetails.rejected, (state, action) => {
        state.loading = false;
        state.subscriptionActive = false;
        state.subscriptionData = null;
        state.error = action.payload as string;
      })
      .addCase(cancelUserSubscription.fulfilled, (state) => {
        state.subscriptionActive = false;
        state.subscriptionData = null;
        state.error = null;
      })
      .addCase(cancelUserSubscription.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(renewUserSubscription.fulfilled, (state, action) => {
        state.subscriptionActive = true;
        state.subscriptionData = action.payload!;
      })
      .addCase(renewUserSubscription.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer;