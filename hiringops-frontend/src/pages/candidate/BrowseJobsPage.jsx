import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from "../../features/jobs/jobSlice";
import { applyJob } from "../../features/jobs/jobSlice";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

const BrowseJobsPage = () => {
  const dispatch = useDispatch();

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 50 }));
  }, [dispatch]);

  const handleApply = async (jobId) => {
    const result = await dispatch(applyJob(jobId));

    console.log(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Browse Jobs</h1>

        <p className="text-gray-500">Find your next opportunity</p>
      </div>

      {loading && <Loader />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && (
        <EmptyState
          title="No Jobs Available"
          description="Please check again later"
        />
      )}

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <Card key={job._id}>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {job.title}
                </h2>

                <p className="text-gray-600">{job.company}</p>
              </div>

              <div className="flex gap-6 text-sm text-gray-500">
                <span>📍 {job.location}</span>

                <span>💰 {job.salary}</span>
              </div>

              <p className="text-gray-700">{job.description}</p>

              <Button onClick={() => handleApply(job._id)}>Apply Now</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrowseJobsPage;
