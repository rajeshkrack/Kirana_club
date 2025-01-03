import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Select,
  TextField,
  Pagination,
  Spinner,
  Page,
  Layout,
  BlockStack,
  CalloutCard,
} from "@shopify/polaris";
import ContestList from "../components/ContestList";
import Favorites from "../components/Favorites";
import Graph from "../components/Graph";
import { fetchContests } from "../utils/api";
import { debounce } from "lodash";

const Dashboard = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests().then((data) => {
      setContests(data);
      setFilteredContests(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    filterContests(query, selectedType);
  }, 300);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterContests(searchQuery, type);
  };

  const handleFavorite = (contestId) => {
    const updatedFavorites = favorites.includes(contestId)
      ? favorites.filter((id) => id !== contestId)
      : [...favorites, contestId];
    setFavorites(updatedFavorites);
  };

  const filterContests = (query, type) => {
    let result = contests;

    if (query) {
      result = result.filter((contest) =>
        contest.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type) {
      result = result.filter((contest) => contest.type === type);
    }

    setFilteredContests(result);
  };

  const paginatedData = filteredContests.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <Page title="Codeforces Dashboard">
      <Layout>
        {/* Search Bar Section */}
        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Search Contests"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Enter contest name"
              clearButton
            />
          </Card>
        </Layout.Section>

        {/* Type Filter Section */}
        <Layout.Section>
          <Card sectioned>
            <Select
              label="Filter by Type"
              options={[
                { label: "All", value: "" },
                { label: "CF", value: "CF" },
                { label: "ICPC", value: "ICPC" },
              ]}
              onChange={handleTypeChange}
              value={selectedType}
            />
          </Card>
        </Layout.Section>

        {/* Favorites Section */}
        <Layout.Section>
          <Card sectioned>
            <Favorites
              contests={contests}
              favorites={favorites}
              onFavoriteToggle={handleFavorite}
            />
          </Card>
        </Layout.Section>

        {/* Contest List Section */}
        <Layout.Section>
          <Card title="Contests" sectioned>
            {loading ? (
              <div className="flex justify-center">
                <Spinner size="large" />
              </div>
            ) : (
              <ContestList
                contests={paginatedData}
                favorites={favorites}
                onFavoriteToggle={handleFavorite}
              />
            )}
          </Card>
        </Layout.Section>

        {/* Pagination Section */}
        <Layout.Section>
          <Card sectioned>
            <Pagination
              hasPrevious={page > 1}
              hasNext={page < Math.ceil(filteredContests.length / perPage)}
              onNext={() => setPage(page + 1)}
              onPrevious={() => setPage(page - 1)}
            />
          </Card>
        </Layout.Section>

        {/* Graph Section */}
        <Layout.Section>
          <Card sectioned>
            <BlockStack>
              <h2>Contest Trends</h2>
            </BlockStack>
            <Graph contests={filteredContests} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;
