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
import './styles/Dashboard.css';  // Import the custom CSS file

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
        <Layout.Section className="bg-teal-100 p-4 rounded-lg shadow-lg">
          <Card 
            sectioned 
            className="bg-teal-100 border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <TextField
              label={<span className="text-lg font-semibold text-blue-600">Search Contests</span>}
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Enter contest name"
              clearButton
              className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              placeholderTextClassName="text-gray-400 italic"
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
              className="border border-gray-300 rounded-lg shadow-sm"
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
          <Card title="Contests" sectioned className="shadow-md rounded-lg">
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
            <div className="flex justify-between items-center">
              {/* Previous Button */}
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                primary
                className="px-4 py-2 bg-blue-500 text-white rounded shadow disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                Previous
              </Button>
              
              {/* Page Count */}
              <span className="text-gray-600">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{Math.ceil(filteredContests.length / perPage)}</span>
              </span>
              
              {/* Next Button */}
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(filteredContests.length / perPage)}
                primary
                className="px-4 py-2 bg-blue-500 text-white rounded shadow disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                Next
              </Button>
            </div>

            {/* Optional: Items per page selector */}
            <div className="mt-4 sm:mt-0 flex justify-center items-center space-x-4">
              <span className="text-gray-600">Items per page: </span>
              <Select
                value={perPage}
                onChange={(e) => setPerPage(Number(e))}
                options={[
                  { label: '10', value: 10 },
                  { label: '20', value: 20 },
                  { label: '50', value: 50 },
                ]}
                className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </Card>
        </Layout.Section>

        {/* Graph Section */}
        <Layout.Section>
          <Card sectioned>
            <BlockStack>
              <h2 className="text-2xl font-semibold text-gray-800">Contest Trends</h2>
            </BlockStack>
            <Graph contests={filteredContests} />
          </Card>
        </Layout.Section>
      </Layout>

      {/* Footer Section */}
      <Layout.Section>
        <Card sectioned>
          <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="text-center">
              <p>&copy; 2025 Codeforces Dashboard. All rights reserved.</p>
            </div>
          </footer>
        </Card>
      </Layout.Section>
    </Page>
  );
};

export default Dashboard;
