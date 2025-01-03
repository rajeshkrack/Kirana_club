import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContests } from "../utils/api";
import { formatDate } from "../utils/helpers";

const ContestDetails = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests().then((data) => {
      const selectedContest = data.find((item) => item.id === Number(contestId));
      setContest(selectedContest);
      setLoading(false);
    });
  }, [contestId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="spinner-border animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Contest not found!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{contest.name}</h1>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-blue-600">ID:</span> {contest.id}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-blue-600">Type:</span> {contest.type}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-blue-600">Phase:</span> {contest.phase}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-blue-600">Start Time:</span>{" "}
            {formatDate(contest.startTimeSeconds)}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-semibold text-blue-600">Duration:</span>{" "}
            {contest.durationSeconds / 3600} hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
