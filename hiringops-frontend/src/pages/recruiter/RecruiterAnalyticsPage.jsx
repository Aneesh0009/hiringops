import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecruiterAnalytics } from "../../features/analytics/analyticsSlice";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const FUNNEL_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

const formatMonthLabel = ({ year, month }) => {
  const date = new Date(year, month - 1);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const RecruiterAnalyticsPage = () => {
  const dispatch = useDispatch();

  const {
    hiringFunnel,
    applicationsByMonth,
    topJobs,
    recruiterPerformance,
    timeToHire,
    loading,
    error,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchRecruiterAnalytics());
  }, [dispatch]);

  const totalApplications = useMemo(
    () => hiringFunnel.reduce((acc, curr) => acc + (curr.count ?? 0), 0),
    [hiringFunnel],
  );

  const activeCandidates = useMemo(
    () =>
      hiringFunnel
        .filter((item) => item._id !== "Rejected")
        .reduce((acc, curr) => acc + (curr.count ?? 0), 0),
    [hiringFunnel],
  );

  const offeredCount = useMemo(
    () => hiringFunnel.find((item) => item._id === "Offered")?.count ?? 0,
    [hiringFunnel],
  );

  const trendData = useMemo(
    () =>
      applicationsByMonth.map((item) => ({
        ...item,
        monthLabel: item.monthLabel ?? formatMonthLabel(item._id),
      })),
    [applicationsByMonth],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Recruiter Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Executive ATS intelligence for your hiring pipeline
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <h2 className="text-gray-500 text-sm font-medium">
            Total Applications
          </h2>
          <p className="text-4xl font-bold mt-4">{totalApplications}</p>
        </Card>

        <Card>
          <h2 className="text-gray-500 text-sm font-medium">
            Active Candidates
          </h2>
          <p className="text-4xl font-bold mt-4">{activeCandidates}</p>
        </Card>

        <Card>
          <h2 className="text-gray-500 text-sm font-medium">Offers Made</h2>
          <p className="text-4xl font-bold mt-4">{offeredCount}</p>
        </Card>

        <Card>
          <h2 className="text-gray-500 text-sm font-medium">
            Avg. Time to Hire
          </h2>
          <p className="text-4xl font-bold mt-4">
            {timeToHire?.averageDays ?? 0}
            <span className="text-lg font-normal text-gray-500 ml-1">days</span>
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* HIRING FUNNEL */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Hiring Funnel</h2>
          <div className="h-[400px]">
            {hiringFunnel.length === 0 ? (
              <p className="text-gray-500 text-center py-16">
                No application data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hiringFunnel}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    label={({ _id, count }) => `${_id}: ${count}`}
                  >
                    {hiringFunnel.map((entry, index) => (
                      <Cell
                        key={entry._id}
                        fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* APPLICATIONS TREND */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Applications Trend</h2>
          <div className="h-[400px]">
            {trendData.length === 0 ? (
              <p className="text-gray-500 text-center py-16">
                No trend data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthLabel" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* TOP JOBS */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Top Jobs</h2>
          <div className="h-[400px]">
            {topJobs.length === 0 ? (
              <p className="text-gray-500 text-center py-16">No job data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topJobs}
                  layout="vertical"
                  margin={{ left: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="title"
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="applications"
                    fill="#10b981"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* RECRUITER PERFORMANCE */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Recruiter Performance</h2>
          <div className="h-[400px]">
            {recruiterPerformance.length === 0 ? (
              <p className="text-gray-500 text-center py-16">
                No recruiter activity yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruiterPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="recruiter"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="applicationsProcessed"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterAnalyticsPage;
