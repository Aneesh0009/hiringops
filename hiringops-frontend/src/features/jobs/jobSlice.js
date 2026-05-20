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
  jobs: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
};

export const createJob = createAsyncThunk(
  "jobs/createJob",

  async (jobData, thunkAPI) => {
    try {
      const response = await API.post("/api/jobs", jobData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",

  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await API.patch(`/api/jobs/${id}`, updatedData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",

  async (jobId, thunkAPI) => {
    try {
      await API.delete(`/api/jobs/${jobId}`);

      return jobId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const applyJob = createAsyncThunk(
  "jobs/applyJob",

  async (jobId, thunkAPI) => {
    try {
      const response = await API.post(`/api/jobs/${jobId}/apply`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.job) {
          state.jobs.push(action.payload.job);
        }
      })

      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const payload = action.payload;
        state.jobs = Array.isArray(payload) ? payload : (payload?.jobs ?? []);
        if (!Array.isArray(payload) && payload) {
          state.pagination = {
            page: payload.page ?? 1,
            limit: payload.limit ?? 10,
            total: payload.total ?? 0,
            totalPages: payload.totalPages ?? 1,
          };
        }
      })

      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.jobs = [];
      })

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload?.job;
        if (!updated) return;

        const updatedId = String(updated._id);
        state.jobs = state.jobs.map((job) =>
          String(job._id) === updatedId ? updated : job,
        );
      })

      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        const deletedId = String(action.payload);
        state.jobs = state.jobs.filter(
          (job) => String(job._id ?? job.id) !== deletedId,
        );
      })

      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",

  async (
    { search = "", status = "All", page = 1, limit = 10 } = {},
    thunkAPI,
  ) => {
    try {
      const query = buildQueryString({
        search,
        status: status === "All" ? undefined : status,
        page,
        limit,
      });

      const response = await API.get(`/api/jobs${query}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export default jobSlice.reducer;
