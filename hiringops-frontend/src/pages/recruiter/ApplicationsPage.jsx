import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchApplications,
  updateApplicationStage,
} from "../../features/applications/applicationSlice";
import { APPLICATION_STAGES } from "../../constants/applicationStages";
import { useDebounce } from "../../hooks/useDebounce";

import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const stageVariantMap = {
  Applied: "info",
  Screening: "warning",
  Interview: "warning",
  Offered: "success",
  Rejected: "danger",
};

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { applications, loading, error, pagination } = useSelector(
    (state) => state.applications,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, stageFilter]);

  useEffect(() => {
    dispatch(
      fetchApplications({
        search: debouncedSearch,
        stage: stageFilter,
        page,
        limit: 10,
      }),
    );
  }, [dispatch, debouncedSearch, stageFilter, page]);

  const handleStageChange = async (applicationId, stage) => {
    await dispatch(updateApplicationStage({ applicationId, stage }));
  };

  const columns = [
    {
      key: "candidate",
      title: "Candidate",
      render: (app) => (
        <div>
          <p className="font-medium">
            {app.candidateSnapshot?.fullName ?? "—"}
          </p>
          <p className="text-sm text-gray-500">
            {app.candidateSnapshot?.email ?? ""}
          </p>
        </div>
      ),
    },
    {
      key: "job",
      title: "Job",
      render: (app) => app.jobId?.title ?? "—",
    },
    {
      key: "stage",
      title: "Stage",
      render: (app) => (
        <select
          value={app.currentStage}
          onChange={(e) => handleStageChange(app._id, e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {APPLICATION_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (app) => (
        <Badge variant={stageVariantMap[app.currentStage]}>
          {app.currentStage}
        </Badge>
      ),
    },
    {
      key: "appliedAt",
      title: "Applied",
      render: (app) =>
        app.appliedAt
          ? new Date(app.appliedAt).toLocaleDateString()
          : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
        <p className="text-gray-500">
          Search, filter by pipeline stage, and manage candidates
        </p>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-[300px]"
          />

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">All Stages</option>
            {APPLICATION_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {loading && <Loader />}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && !error && applications.length === 0 && (
          <EmptyState
            title="No Applications Found"
            description="Try adjusting search or stage filters"
          />
        )}

        {!loading && applications.length > 0 && (
          <>
            <Table columns={columns} data={applications} />

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

export default ApplicationsPage;
