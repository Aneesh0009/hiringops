import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute
              allowedRoles={["recruiter"]}
            >
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        {/* CANDIDATE */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute
              allowedRoles={["candidate"]}
            >
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;