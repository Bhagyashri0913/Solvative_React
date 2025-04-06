// src/components/ResultsTable.jsx
import React from 'react';

const ResultsTable = ({ results, debouncedQuery, itemsPerPage }) => {
  const shouldShowStartMsg = !debouncedQuery?.trim();
  const noResults = debouncedQuery?.trim() && results.length === 0;

  return (
    <div className="results-table-wrapper">
      {shouldShowStartMsg ? (
        <div className="table-message">Start searching</div>
      ) : noResults ? (
        <div className="table-message">No result found</div>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(0, itemsPerPage).map((place, index) => (
              <tr key={place.id}>
                <td>{index + 1}</td>
                <td>{place.city}</td>
                <td>
                  {place.country}
                  {place.countryCode && (
                    <img
                      src={`https://flagsapi.com/${place.countryCode}/shiny/64.png`}
                      alt={place.country}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultsTable;
