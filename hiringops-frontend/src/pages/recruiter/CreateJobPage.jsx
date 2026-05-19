import { useState } from "react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../features/jobs/jobSlice";

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.jobs);
  const { error } = useSelector((state) => state.jobs);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createJob(formData));

    console.log(result);

    if (result.meta.requestStatus === "fulfilled") {
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold mb-6">Create Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
          />

          <Input
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />

          <Input
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
          />

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Enter job description"
              className="
                border border-gray-300
                rounded-lg
                px-4 py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* REQUIREMENTS */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Requirements</label>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={5}
              placeholder="Enter job requirements"
              className="
                border border-gray-300
                rounded-lg
                px-4 py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <Button type="submit">
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateJobPage;
