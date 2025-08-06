import { useState } from "react";
import API from "../services/api";

function ResumeUpload({ setResumeText }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    const { data } = await API.post("/resume/upload", formData);
    setResumeText(data.resumeText);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="file-input file-input-bordered w-full" />
      <button onClick={upload} className="btn btn-primary mt-2">Upload Resume</button>
    </div>
  );
}

export default ResumeUpload;
