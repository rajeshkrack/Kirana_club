import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContests } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Card, Spinner } from "@shopify/polaris";

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
        <BlockStack>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">{contest.name}</h1>
          <p>
            <Text  variation="strong">ID:</Text > {contest.id}
          </p>
          <p>
            <Text  variation="strong">Type:</Text > {contest.type}
          </p>
          <p>
            <Text  variation="strong">Phase:</Text > {contest.phase}
          </p>
          <p>
            <Text  variation="strong">Start Time:</Text >{" "}
            {formatDate(contest.startTimeSeconds)}
          </p>
          <p>
            <Text  variation="strong">Duration:</Text >{" "}
            {contest.durationSeconds / 3600} hours
          </p>
        </BlockStack>
      </Card>
    </div>
  );
};

export default ContestDetails;
