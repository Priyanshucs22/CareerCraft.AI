import { useState } from "react";
import API from "../services/api";

function Roadmap({ resumeText }) {
  const [interests, setInterests] = useState('');
  const [roadmap, setRoadmap] = useState('');

  const generate = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      alert("Please log in to generate a roadmap.");
      return;
    }

    const user = JSON.parse(userString);

    try {
      const { data } = await API.post("/roadmap/generate", {
        resumeText,
        interests,
        userId: user._id,
      });
      setRoadmap(data.roadmapText);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Try again later.");
    }
  };

  return (
    <div className="p-4">
      <textarea
        placeholder="Your Interests (e.g. Web Dev, AI)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <button className="btn btn-success mt-2" onClick={generate}>
        Generate Roadmap
      </button>
      {roadmap && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">📋 Career Roadmap:</h3>
          <pre className="bg-base-200 p-4 whitespace-pre-wrap rounded">{roadmap}</pre>
        </div>
      )}
    </div>
  );
}

export default Roadmap;
