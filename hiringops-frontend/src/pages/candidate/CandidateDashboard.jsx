import ResumeUpload from "../../components/profile/ResumeUpload";

function CandidateDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Candidate Dashboard
      </h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Upload Your Resume
        </h2>
        <ResumeUpload />
      </div>
    </div>
  );
}

export default CandidateDashboard;