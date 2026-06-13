import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecruiterApplicants } from "../../features/applications/applicationSlice";
import { useDebounce } from "../../hooks/useDebounce";

import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

const ApplicantsPage = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { applications, loading, error, pagination } = useSelector(
    (state) => state.applications,
  );

  useEffect(() => {
    dispatch(
      fetchRecruiterApplicants({
        search: debouncedSearch,
        page,
        limit: 10,
      }),
    );
  }, [dispatch, debouncedSearch, page]);

  const columns = [
    {
      key: "candidate",
      title: "Candidate",
      render: (app) => (
        <div>
          <p className="font-medium">
            {app.candidateName ?? app.candidateSnapshot?.fullName ?? "—"}
          </p>
          <p className="text-sm text-gray-500">
            {app.candidateEmail ?? app.candidateSnapshot?.email ?? ""}
          </p>
        </div>
      ),
    },
    {
      key: "applicationsCount",
      title: "Applications",
      render: (app) => app.applicationsCount ?? 0,
    },
    {
      key: "latestStage",
      title: "Latest Stage",
      render: (app) => app.latestStage ?? app.latestStatus ?? "—",
    },
    {
      key: "lastApplied",
      title: "Last Applied",
      render: (app) =>
        (app.lastApplied ?? app.latestAppliedAt)
          ? new Date(app.lastApplied ?? app.latestAppliedAt).toLocaleDateString()
          : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>
        <p className="text-gray-500">
          Review candidate activity and application progress across jobs
        </p>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-4 py-2 w-full sm:w-[300px]"
          />

        </div>

        {loading && <Loader />}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && !error && applications.length === 0 && (
          <EmptyState
            title="No Applicants Found"
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

export default ApplicantsPage;
