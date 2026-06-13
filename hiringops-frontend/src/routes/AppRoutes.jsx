import { Routes, Route } from "react-router-dom";
import EditJobPage from "../pages/recruiter/EditJobPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateJobPage from "../pages/recruiter/CreateJobPage";
import ProtectedRoute from "./ProtectedRoutes";
import BrowseJobsPage from "../pages/candidate/BrowseJobsPage";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ApplicationsPage from "../pages/recruiter/ApplicationsPage";
import ApplicantsPage from "../pages/recruiter/ApplicantsPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersPage from "../pages/admin/UserPage";
import RecruiterAnalyticsPage from "../pages/recruiter/RecruiterAnalyticsPage";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import JobsPage from "../pages/recruiter/JobsPage";

import CandidateDashboard from "../pages/candidate/CandidateDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs/create" element={<CreateJobPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/edit/:id" element={<EditJobPage />} />
        <Route path="applicants" element={<ApplicantsPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="analytics" element={<RecruiterAnalyticsPage />} />
      </Route>

      <Route
        path="/candidate"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CandidateDashboard />} />
        <Route path="jobs" element={<BrowseJobsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
