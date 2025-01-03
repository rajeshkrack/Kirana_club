import React from "react";
import { Button, Select, BlockStack, Stack, Icon } from "@shopify/polaris";
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
        <Stack spacing="tight">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            icon={ChevronLeftMinor}
            plain
            style={{
              backgroundColor: page === 1 ? '#f1f1f1' : '#0061f2',
              color: page === 1 ? '#ccc' : '#fff',
              borderRadius: '4px',
              padding: '8px 12px',
            }}
          >
            Previous
          </Button>

          <BlockStack>
            <Text variation="strong" style={{ fontSize: '1.1rem' }}>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </Text>
          </BlockStack>

          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            icon={ChevronRightMinor}
            plain
            style={{
              backgroundColor: page === totalPages ? '#f1f1f1' : '#0061f2',
              color: page === totalPages ? '#ccc' : '#fff',
              borderRadius: '4px',
              padding: '8px 12px',
            }}
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
          style={{
            width: '120px',
            borderColor: '#0061f2',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
          }}
        />
      </Stack>
    </div>
  );
};

export default Pagination;
