import { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import Roadmap from "./Roadmap";

function Dashboard() {
  const [resumeText, setResumeText] = useState("");

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚀 Welcome to your Dashboard</h1>
      <ResumeUpload setResumeText={setResumeText} />
      {resumeText && <Roadmap resumeText={resumeText} />}
    </div>
  );
}

export default Dashboard;