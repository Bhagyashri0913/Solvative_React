// components/PaginationControls.jsx
import React, { useState } from 'react';

const PaginationControls = ({
  page, setPage,
  totalCount,
  limit, setLimit,
  maxLimit,
  itemsPerPage, setItemsPerPage
}) => {
  const [limitInput, setLimitInput] = useState(limit);
  const [warning, setWarning] = useState('');

  const totalPages = Math.ceil(totalCount / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimitInput(e.target.value);

    if (!isNaN(value)) {
      if (value <= maxLimit) {
        setWarning('');
        setLimit(value);
        setPage(1); // reset to first page
      } else {
        setWarning(`Max limit is ${maxLimit}`);
      }
    }
  };

  return (
    <div className="pagination-controls">
      {/* Pagination buttons */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={page === i + 1 ? 'active' : ''}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {/* API Limit Input */}
      <div className="limit-input">
        <label>API Limit (max {maxLimit}): </label>
        <input
          type="number"
          min="1"
          max={maxLimit}
          value={limitInput}
          onChange={handleLimitChange}
        />
        {warning && <p className="warning">{warning}</p>}
      </div>

      {/* Items Per Page Input (optional) */}
      <div className="items-per-page">
        <label>Rows per page:</label>
        <input
          type="number"
          min="1"
          max={limit}
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PaginationControls;
