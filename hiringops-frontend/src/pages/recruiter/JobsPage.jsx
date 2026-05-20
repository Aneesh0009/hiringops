import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { fetchJobs, deleteJob } from "../../features/jobs/jobSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { ROUTES } from "../../constants/routes";

import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

const JobsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { jobs = [], loading, error, pagination } = useSelector(
    (state) => state.jobs,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    dispatch(
      fetchJobs({
        search: debouncedSearch,
        status: statusFilter,
        page,
        limit: 10,
      }),
    );
  }, [dispatch, debouncedSearch, statusFilter, page]);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Delete this job?");
    if (!confirmDelete) return;
    await dispatch(deleteJob(jobId));
    dispatch(
      fetchJobs({
        search: debouncedSearch,
        status: statusFilter,
        page,
        limit: 10,
      }),
    );
  };

  const formatSalary = (job) => {
    const { min, max } = job.salaryRange ?? {};
    if (min != null && max != null) return `${min} – ${max}`;
    if (min != null) return String(min);
    if (max != null) return String(max);
    return "—";
  };

  const columns = [
    { key: "title", title: "Title" },
    {
      key: "location",
      title: "Location",
      render: (job) => job.location || "—",
    },
    {
      key: "status",
      title: "Status",
      render: (job) => job.status || "—",
    },
    {
      key: "salary",
      title: "Salary",
      render: (job) => formatSalary(job),
    },
    {
      key: "actions",
      title: "Actions",
      render: (job) => (
        <div className="flex gap-2">
          <Link to={`${ROUTES.RECRUITER_JOBS}/edit/${job._id}`}>
            <Button
              variant="secondary"
              onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}
            >
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(job._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-500">Manage recruiter jobs</p>
        </div>
        <Link to={ROUTES.RECRUITER_CREATE_JOB}>
          <Button>Create Job</Button>
        </Link>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-[300px]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">All Statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading && <Loader />}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <EmptyState
            title="No Jobs Found"
            description="Create your first job or adjust filters"
          />
        )}

        {!loading && jobs.length > 0 && (
          <>
            <Table columns={columns} data={jobs} />

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages} ·{" "}
                {pagination.total} total
              </p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(pagination.totalPages, p + 1),
                    )
                  }
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default JobsPage;
