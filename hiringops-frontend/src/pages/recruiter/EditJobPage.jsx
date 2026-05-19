import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchJobs, updateJob } from "../../features/jobs/jobSlice";
import { ROUTES } from "../../constants/routes";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const jobToFormData = (job) => {
  const { min, max } = job.salaryRange ?? {};
  let salary = "";
  if (min != null && max != null) salary = `${min} - ${max}`;
  else if (min != null) salary = String(min);
  else if (max != null) salary = String(max);

  return {
    title: job.title || "",
    company: job.company || "",
    location: job.location || "",
    salary,
    description: job.description || "",
    requirements: Array.isArray(job.requirements)
      ? job.requirements.join(", ")
      : job.requirements || "",
  };
};

const EditJobForm = ({ jobId, job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(() => jobToFormData(job));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateJob({
        id: jobId,
        updatedData: {
          ...formData,
          requirements: formData.requirements
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate(ROUTES.RECRUITER_JOBS);
    }
  };

  return (
    <Card>
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <Input
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-gray-700"
          >
            Requirements (comma-separated)
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Update Job</Button>
      </form>
    </Card>
  );
};

const EditJobPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  const existingJob = jobs.find((job) => String(job._id) === id);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  if (loading && !existingJob) {
    return <Loader />;
  }

  if (!existingJob) {
    return (
      <Card>
        <p className="text-gray-600 mb-4">Job not found.</p>
        <Link to={ROUTES.RECRUITER_JOBS}>
          <Button variant="secondary">Back to Jobs</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditJobForm key={existingJob._id} jobId={id} job={existingJob} />
    </div>
  );
};

export default EditJobPage;
