import { Routes, Route } from "react-router-dom";
import EditJobPage from "../pages/recruiter/EditJobPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateJobPage from "../pages/recruiter/CreateJobPage";
import ProtectedRoute from "./ProtectedRoutes";

import DashboardLayout from "../components/layouts/DashboardLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersPage from "../pages/admin/UserPage";

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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
