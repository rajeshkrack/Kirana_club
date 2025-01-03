import React from "react";
import { TextField, Select, Stack } from "@shopify/polaris";

const SearchBar = ({ value, onSearch, selectedType, onTypeChange }) => {
  const filterOptions = [
    { label: "All Types", value: "" },
    { label: "ICPC", value: "ICPC" },
    { label: "Codeforces", value: "CF" },
  ];

  return (
    <Stack vertical spacing="loose">
      <Stack alignment="center" distribution="fillEvenly">
        {/* Search Input */}
        <TextField
          label="Search contests by name"
          value={value}
          onChange={(newValue) => onSearch(newValue)}
          placeholder="Search contests by name..."
          clearButton
          onClearButtonClick={() => onSearch('')}
          autoComplete="off"
        />

        {/* Dropdown Filter */}
        <Select
          label="Filter by Type"
          options={filterOptions}
          value={selectedType}
          onChange={onTypeChange}
        />
      </Stack>
    </Stack>
  );
};

export default SearchBar;
