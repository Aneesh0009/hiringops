import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../../features/jobs/jobSlice";
import { deleteJob } from "../../features/jobs/jobSlice";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const JobsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs = [], loading, error } = useSelector((state) => state.jobs);
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Delete this job?");

    if (!confirmDelete) return;

    await dispatch(deleteJob(jobId));
  };
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const formatSalary = (job) => {
    const { min, max } = job.salaryRange ?? {};
    if (min != null && max != null) return `${min} – ${max}`;
    if (min != null) return String(min);
    if (max != null) return String(max);
    return "—";
  };

  const columns = [
    {
      key: "title",
      title: "Title",
    },
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
              onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}>
              Edit
            </Button>{" "}
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
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>

        <p className="text-gray-500">Manage recruiter jobs</p>
      </div>

      <Card>
        {loading && <Loader />}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <EmptyState
            title="No Jobs Found"
            description="Create your first job"
          />
        )}

        {!loading && jobs.length > 0 && <Table columns={columns} data={jobs} />}
      </Card>
    </div>
  );
};

export default JobsPage;
