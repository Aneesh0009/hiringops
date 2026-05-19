import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";

const columns = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "role",
    title: "Role",
  },
  {
    key: "status",
    title: "Status",
  },
];

const data = [
  {
    name: "Aneesh",
    role: "Recruiter",
    status: "Active",
  },
  {
    name: "Rahul",
    role: "Candidate",
    status: "Pending",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-500">UI Component Testing Page</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold">Total Users</h2>

          <p className="text-3xl font-bold mt-2">120</p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Recruiters</h2>

          <p className="text-3xl font-bold mt-2">25</p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Applications</h2>

          <p className="text-3xl font-bold mt-2">860</p>
        </Card>
      </div>

      {/* TABLE CARD */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Users</h2>

          <Button>Add User</Button>
        </div>

        <Table columns={columns} data={data} />
      </Card>

      {/* BADGES */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Status Badges</h2>

        <div className="flex gap-4">
          <Badge variant="success">Active</Badge>

          <Badge variant="warning">Pending</Badge>

          <Badge variant="danger">Blocked</Badge>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
