import React from "react";
import { TextField, Select, Stack } from "@shopify/polaris";
import { SearchMinor, FilterMinor } from "@shopify/polaris-icons";

const SearchBar = ({ value, onSearch, selectedType, onTypeChange }) => {
  const filterOptions = [
    { label: "All Types", value: "" },
    { label: "ICPC", value: "ICPC" },
    { label: "Codeforces", value: "CF" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <Stack vertical spacing="loose">
        <Stack alignment="center" distribution="equalSpacing" spacing="tight">
          {/* Search Input */}
          <div className="relative flex-1">
            <TextField
              label=""
              value={value}
              onChange={(newValue) => onSearch(newValue)}
              placeholder="Search contests by name..."
              clearButton
              onClearButtonClick={() => onSearch("")}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
              <SearchMinor />
            </span>
          </div>

          {/* Dropdown Filter */}
          <div className="relative">
            <Select
              label=""
              options={filterOptions}
              value={selectedType}
              onChange={onTypeChange}
              placeholder="Filter by Type"
              className="w-full max-w-xs px-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
              <FilterMinor />
            </span>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default SearchBar;
