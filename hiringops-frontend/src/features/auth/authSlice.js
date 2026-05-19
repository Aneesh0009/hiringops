import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import { setAccessToken } from "../../api/axios";

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const response = await API.post("/api/auth/login", userData);

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }

      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          email: action.payload.email,
        };

        state.accessToken = action.payload.accessToken;

        setAccessToken(action.payload.accessToken);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })

      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const loadUser = createAsyncThunk(
  "auth/loadUser",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("api/auth/me");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
