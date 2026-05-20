import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobReducer from "../features/jobs/jobSlice";
import applicationReducer from "../features/applications/applicationSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import notificationReducer from "../features/notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    analytics: analyticsReducer,
    applications: applicationReducer,
    notifications: notificationReducer,
  },
});
