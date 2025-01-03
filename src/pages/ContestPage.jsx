import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContests } from "../utils/api";
import { formatDate } from "../utils/helpers";
import { Page, Card, BlockStack, Text , Spinner, Layout } from "@shopify/polaris";

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
            <BlockStack>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{contest.name}</h2>
              <div className="text-gray-600 space-y-2">
                <p>
                  <Text  variation="strong">Type:</Text > {contest.type}
                </p>
                <p>
                  <Text  variation="strong">Phase:</Text > {contest.phase}
                </p>
                <p>
                  <Text  variation="strong">Start Time:</Text > {formatDate(contest.startTimeSeconds)}
                </p>
                <p>
                  <Text  variation="strong">Duration:</Text > {contest.durationSeconds / 3600} hours
                </p>
              </div>
            </BlockStack>
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
