import React from "react";
import { Button, Select, TextContainer, Stack, Icon } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';

const Pagination = ({ total, page, perPage, onPageChange, onPerPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePerPageChange = (value) => {
    onPerPageChange(Number(value));
  };

  const perPageOptions = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "50", value: "50" },
  ];

  return (
    <div className="mt-6">
      <Stack alignment="center" distribution="spaceBetween">
        {/* Pagination Controls */}
        <Stack>
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            icon={ChevronLeftMinor}
            plain
          >
            Previous
          </Button>

          <TextContainer>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </TextContainer>

          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            icon={ChevronRightMinor}
            plain
          >
            Next
          </Button>
        </Stack>

        {/* Items per page dropdown */}
        <Select
          label="Items per page"
          options={perPageOptions}
          value={perPage.toString()}
          onChange={handlePerPageChange}
        />
      </Stack>
    </div>
  );
};

export default Pagination;
