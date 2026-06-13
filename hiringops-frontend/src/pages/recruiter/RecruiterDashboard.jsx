import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/ui/Card";

import { fetchRecruiterAnalytics } from "../../features/analytics/analyticsSlice";

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  const { hiringFunnel, topJobs, loading } = useSelector(
    (state) => state.analytics,
  );

  useEffect(() => {
    dispatch(fetchRecruiterAnalytics());
  }, [dispatch]);

  const totalApplications =
    hiringFunnel?.reduce((acc, curr) => acc + curr.count, 0) || 0;

  const offeredCount =
    hiringFunnel?.find((item) => item._id === "Offered")?.count || 0;

  const interviewCount =
    hiringFunnel?.find((item) => item._id === "Interview")?.count || 0;

  const activeCandidates =
    hiringFunnel
      ?.filter((item) => item._id !== "Rejected")
      .reduce((acc, curr) => acc + curr.count, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>

        <p className="text-gray-500 mt-2">Overview of hiring activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-gray-500">Total Applications</h3>

          <p className="text-4xl font-bold mt-3">{totalApplications}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Active Candidates</h3>

          <p className="text-4xl font-bold mt-3">{activeCandidates}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Interviews</h3>

          <p className="text-4xl font-bold mt-3">{interviewCount}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Offers</h3>

          <p className="text-4xl font-bold mt-3">{offeredCount}</p>
        </Card>
      </div>

      {/* Top Jobs */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Top Performing Jobs</h2>

        {loading ? (
          <p>Loading...</p>
        ) : topJobs?.length > 0 ? (
          <div className="space-y-4">
            {topJobs.slice(0, 5).map((job) => (
              <div key={job._id} className="flex justify-between border-b pb-2">
                <span className="font-medium">{job.title}</span>

                <span>{job.applications} Applications</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No job data available</p>
        )}
      </Card>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/recruiter/jobs/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Job
          </Link>

          <Link
            to="/recruiter/jobs"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Manage Jobs
          </Link>

          <Link
            to="/recruiter/applications"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            View Applications
          </Link>

          <Link
            to="/recruiter/analytics"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Analytics
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterDashboard;
