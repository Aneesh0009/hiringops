import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../api/axios";

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
};

const initialState = {
  applications: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
};

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",

  async (
    { search = "", stage = "All", page = 1, limit = 10 } = {},
    thunkAPI,
  ) => {
    try {
      const query = buildQueryString({
        search,
        stage: stage === "All" ? undefined : stage,
        page,
        limit,
      });

      const response = await API.get(`/api/applications/recruiter${query}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to load applications",
      );
    }
  },
);

export const fetchRecruiterApplicants = createAsyncThunk(
  "applications/fetchRecruiterApplicants",

  async ({ search = "", page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const query = buildQueryString({ search, page, limit });
      const response = await API.get(
        `/api/applications/recruiter/applicants${query}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to load applicants",
      );
    }
  },
);

export const updateApplicationStage = createAsyncThunk(
  "applications/updateStage",

  async ({ applicationId, stage }, thunkAPI) => {
    try {
      const response = await API.patch(
        `/api/applications/${applicationId}/stage`,
        { stage },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchMyApplications = createAsyncThunk(
  "applications/fetchMyApplications",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("/api/applications/my");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const withdrawApplication = createAsyncThunk(
  "applications/withdraw",

  async (applicationId, thunkAPI) => {
    try {
      await API.delete(`/api/applications/${applicationId}`);

      return applicationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications ?? [];
        state.pagination = {
          page: action.payload.page ?? 1,
          limit: action.payload.limit ?? 10,
          total: action.payload.total ?? 0,
          totalPages: action.payload.totalPages ?? 1,
        };
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecruiterApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applicants ?? [];
        state.pagination = {
          page: action.payload.page ?? 1,
          limit: action.payload.limit ?? 10,
          total: action.payload.total ?? 0,
          totalPages: action.payload.totalPages ?? 1,
        };
      })
      .addCase(fetchRecruiterApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApplicationStage.fulfilled, (state, action) => {
        const updated = action.payload;
        state.applications = state.applications.map((app) =>
          String(app._id) === String(updated._id) ? updated : app,
        );
      })
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.applications ?? []);
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload,
        );
      });
  },
});

export default applicationSlice.reducer;
