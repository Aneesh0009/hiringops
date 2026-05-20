import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../api/axios";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("/api/notifications");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  "notifications/read",

  async (notificationId, thunkAPI) => {
    try {
      const response = await API.patch(
        `/api/notifications/${notificationId}/read`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchNotifications.pending,

        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        fetchNotifications.fulfilled,

        (state, action) => {
          state.loading = false;

          state.notifications = action.payload;

          state.unreadCount = action.payload.filter((n) => !n.isRead).length;
        },
      )

      .addCase(
        markNotificationRead.fulfilled,

        (state, action) => {
          state.notifications = state.notifications.map((notification) =>
            notification._id === action.payload._id
              ? action.payload
              : notification,
          );

          state.unreadCount = state.notifications.filter(
            (n) => !n.isRead,
          ).length;
        },
      );
  },
});

export default notificationSlice.reducer;
