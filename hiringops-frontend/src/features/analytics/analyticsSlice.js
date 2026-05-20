import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../api/axios";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const unwrapData = (response) => response.data?.data ?? response.data ?? [];

const formatMonthLabel = ({ year, month }) =>
  `${MONTH_NAMES[month - 1]} ${year}`;

const initialState = {
  hiringFunnel: [],
  applicationsByMonth: [],
  topJobs: [],
  recruiterPerformance: [],
  timeToHire: { averageDays: 0 },
  loading: false,
  error: null,
};

export const fetchRecruiterAnalytics = createAsyncThunk(
  "analytics/fetchRecruiterAnalytics",

  async (_, thunkAPI) => {
    try {
      const [funnel, monthly, jobs, recruiters, timeToHire] = await Promise.all([
        API.get("/api/analytics/hiring-funnel"),
        API.get("/api/analytics/applications-by-month"),
        API.get("/api/analytics/top-jobs"),
        API.get("/api/analytics/recruiter-performance"),
        API.get("/api/analytics/time-to-hire"),
      ]);

      const funnelData = unwrapData(funnel);
      const monthlyData = unwrapData(monthly);
      const jobsData = unwrapData(jobs);
      const recruitersData = unwrapData(recruiters);
      const timeData = unwrapData(timeToHire);

      return {
        hiringFunnel: funnelData,

        applicationsByMonth: monthlyData.map((item) => ({
          ...item,
          monthLabel: formatMonthLabel(item._id),
        })),

        topJobs: jobsData.map((job) => ({
          title: job.title ?? job._id ?? "Unknown",
          applications: job.applications ?? job.count ?? 0,
        })),

        recruiterPerformance: recruitersData.map((row) => ({
          recruiter:
            row.recruiter ?? row.fullName ?? row.recruiterName ?? "Unknown",
          applicationsProcessed: row.applicationsProcessed ?? 0,
        })),

        timeToHire:
          typeof timeData === "object" && !Array.isArray(timeData)
            ? timeData
            : { averageDays: 0 },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to load analytics",
      );
    }
  },
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.hiringFunnel = action.payload.hiringFunnel;
        state.applicationsByMonth = action.payload.applicationsByMonth;
        state.topJobs = action.payload.topJobs;
        state.recruiterPerformance = action.payload.recruiterPerformance;
        state.timeToHire = action.payload.timeToHire;
      })
      .addCase(fetchRecruiterAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
