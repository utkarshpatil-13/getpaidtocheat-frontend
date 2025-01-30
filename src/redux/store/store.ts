import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboard.slice'
import contentReducer from './slices/content.slice'
import subscriptionReducer from './slices/subscription.slice'
import adminReducer from './slices/adminSlice'
import payoutReducer from './slices/payout.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    content: contentReducer,
    subscription : subscriptionReducer,
    admin : adminReducer,
    payout : payoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
