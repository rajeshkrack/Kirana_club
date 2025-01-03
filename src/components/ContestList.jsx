import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Text } from "@shopify/polaris";

const ContestList = ({ contests, favorites, onFavoriteToggle }) => {
  const [selectedContestId, setSelectedContestId] = useState(null);

  // Function to handle contest click (to highlight contest name)
  const handleContestClick = (contestId) => {
    setSelectedContestId(contestId);
  };

  // Function to determine the color based on the contest phase
  const getPhaseColor = (phase) => {
    switch (phase.toLowerCase()) {
      case "finished":
        return "bg-green-500 text-white"; // Green for finished
      case "before":
        return "bg-yellow-500 text-white"; // Yellow for before
      case "coding":
        return "bg-blue-500 text-white"; // Blue for coding
      default:
        return "bg-gray-500 text-white"; // Default color
    }
  };

  // Function to determine the color based on the contest type
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "cf":
        return "bg-red-600 text-white"; // Red for Codeforces
      case "icpc":
        return "bg-yellow-800 text-white"; // Dark Yellow for ICPC
      case "regular":
        return "bg-purple-500 text-white"; // Purple for regular
      case "contest":
        return "bg-orange-500 text-white"; // Orange for contest
      case "virtual":
        return "bg-teal-500 text-white"; // Teal for virtual
      default:
        return "bg-gray-300 text-gray-800"; // Default gray for other types
    }
  };

  return (
    <div>
      <Card sectioned>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">
                <Text variation="strong">Name</Text>
              </th>
              <th className="border p-2">
                <Text variation="strong">Type</Text>
              </th>
              <th className="border p-2">
                <Text variation="strong">Phase</Text>
              </th>
              <th className="border p-2">
                <Text variation="strong">Start Time</Text>
              </th>
              <th className="border p-2">
                <Text variation="strong">Favorite</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr
                key={contest.id}
                className="border hover:bg-gray-100"
                onClick={() => handleContestClick(contest.id)}
              >
                <td className="border p-2">
                  <Link
                    to={`/contest/${contest.id}`}
                    className={`${
                      selectedContestId === contest.id
                        ? "text-blue-600 font-bold"
                        : "text-blue-500"
                    } hover:underline text-lg font-semibold`}
                  >
                    {contest.name}
                  </Link>
                </td>
                <td className={`border p-2 ${getTypeColor(contest.type)}`}>
                  {contest.type}
                </td>
                <td className={`border p-2 ${getPhaseColor(contest.phase)}`}>
                  {contest.phase}
                </td>
                <td className="border p-2">
                  {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <Button
                    onClick={() => onFavoriteToggle(contest.id)}
                    size="slim"
                    primary={favorites.includes(contest.id)}
                    className={`${
                      favorites.includes(contest.id)
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    } px-3 py-1 rounded`}
                  >
                    {favorites.includes(contest.id) ? "Unfavorite" : "Favorite"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ContestList;
