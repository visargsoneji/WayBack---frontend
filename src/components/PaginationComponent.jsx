// src/components/PaginationComponent.js
import React from 'react';
import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

const CustomPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    fontSize: '16px', // Larger font size
    borderRadius: '15%', // Rounded shape
    color: '#fff', // Text color
    backgroundColor: '#95cf00', // Background color
    '&:hover': {
      backgroundColor: '#7bb200', // Hover color
    },
    '&.Mui-selected': {
      backgroundColor: '#5e9c00', // Selected color
    },
  },
});

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
      />
    </div>
  );
};

export default PaginationComponent;
