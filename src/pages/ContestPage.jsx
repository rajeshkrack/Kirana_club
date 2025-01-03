import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContests } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Page, Card, TextContainer, TextStyle, Spinner, Layout } from "@shopify/polaris";

const ContestPage = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetchContests().then((data) => {
      const contestDetails = data.find((item) => item.id === Number(contestId));
      setContest(contestDetails);
    });
  }, [contestId]);

  if (!contest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <Page title="Codeforces Dashboard">
      <Layout>
        <Layout.Section>
          <Card title="Contest Details" sectioned>
            <TextContainer>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{contest.name}</h2>
              <div className="text-gray-600 space-y-2">
                <p>
                  <TextStyle variation="strong">Type:</TextStyle> {contest.type}
                </p>
                <p>
                  <TextStyle variation="strong">Phase:</TextStyle> {contest.phase}
                </p>
                <p>
                  <TextStyle variation="strong">Start Time:</TextStyle> {formatDate(contest.startTimeSeconds)}
                </p>
                <p>
                  <TextStyle variation="strong">Duration:</TextStyle> {contest.durationSeconds / 3600} hours
                </p>
              </div>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Codeforces Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </Page>
  );
};

export default ContestPage;
