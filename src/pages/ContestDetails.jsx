import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContests } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Card, TextContainer, TextStyle, Spinner } from "@shopify/polaris";

const ContestDetails = () => {
  const { contestId } = useParams(); // Extract the contest ID from the route
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contest data and find the specific contest by its ID
    fetchContests().then((data) => {
      const selectedContest = data.find((item) => item.id === Number(contestId));
      setContest(selectedContest);
      setLoading(false);
    });
  }, [contestId]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner size="large" />
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Contest not found!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card title="Contest Details" sectioned>
        <TextContainer>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">{contest.name}</h1>
          <p>
            <TextStyle variation="strong">ID:</TextStyle> {contest.id}
          </p>
          <p>
            <TextStyle variation="strong">Type:</TextStyle> {contest.type}
          </p>
          <p>
            <TextStyle variation="strong">Phase:</TextStyle> {contest.phase}
          </p>
          <p>
            <TextStyle variation="strong">Start Time:</TextStyle>{" "}
            {formatDate(contest.startTimeSeconds)}
          </p>
          <p>
            <TextStyle variation="strong">Duration:</TextStyle>{" "}
            {contest.durationSeconds / 3600} hours
          </p>
        </TextContainer>
      </Card>
    </div>
  );
};

export default ContestDetails;
