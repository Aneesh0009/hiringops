import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchMyApplications } from "../../features/applications/applicationSlice";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { withdrawApplication } from "../../features/applications/applicationSlice";

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { applications, loading, error } = useSelector(
    (state) => state.applications,
  );

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const stageVariantMap = {
    Applied: "info",

    Screening: "warning",

    Interview: "warning",

    Offered: "success",

    Rejected: "danger",
  };
  const handleWithdraw = async (applicationId) => {
    await dispatch(withdrawApplication(applicationId));
  };

  const filteredApplications = applications.filter((app) => {
    const candidateName = app.candidateSnapshot?.fullName?.toLowerCase() || "";

    const candidateEmail = app.candidateSnapshot?.email?.toLowerCase() || "";

    return (
      candidateName.includes(search.toLowerCase()) ||
      candidateEmail.includes(search.toLowerCase())
    );
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>

        <p className="text-gray-500">Track your job applications</p>
      </div>

      {loading && <Loader />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && applications.length === 0 && (
        <EmptyState
          title="No Applications"
          description="Apply to jobs to track them here"
        />
      )}

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-[300px]"
        />
      </div>

      <div className="space-y-6">
        {filteredApplications.map((app) => (
          <Card key={app._id}>
            <div className="space-y-4">
              {/* JOB INFO */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {app.jobId?.title}
                </h2>

                <p className="text-gray-500">{app.companyId?.name}</p>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Current Status:</span>

                <Badge variant={stageVariantMap[app.currentStage]}>
                  {app.currentStage}
                </Badge>
              </div>

              {/* APPLIED DATE */}
              <p className="text-sm text-gray-500">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              {/* STAGE HISTORY */}
              <div>
                <h3 className="font-semibold mb-2">Stage Timeline</h3>

                <div className="space-y-2">
                  {app.stageHistory?.map((history, index) => (
                    <div
                      key={index}
                      className="
                  flex
                  items-center
                  gap-4
                  text-sm
                "
                    >
                      <Badge variant="info">{history.stage}</Badge>

                      <span className="text-gray-500">
                        {new Date(history.movedAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WITHDRAW BUTTON */}
              <div className="pt-4">
                <Button
                  variant="danger"
                  onClick={() => handleWithdraw(app._id)}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
