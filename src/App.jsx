// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import ResultsTable from './components/ResultsTable';
import PaginationControls from './components/PaginationControls';
import axios from 'axios';

const API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const API_KEY = '4fe9104b19msh8f64fb305264b3fp102fecjsn5a5f45566d19';
const MAX_LIMIT = 10;

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5); // How many cities to fetch from server
  const [page, setPage] = useState(1);   // Current page
  const [totalCount, setTotalCount] = useState(0); // Total results from API
  const [itemsPerPage, setItemsPerPage] = useState(3); // Items shown in table per page
  const searchInputRef = useRef(null);

  // Debounce the query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut: Ctrl/Cmd + /
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  // Fetch data when debouncedQuery, page or limit changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchPlaces();
    } else {
      setResults([]);
    }
  }, [debouncedQuery, page, limit]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const options = {
        method: 'GET',
        url: `${API_URL}/cities?limit=${limit}&offset=${offset}&namePrefix=${debouncedQuery}`,
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      console.log(response.data);
      setResults(response.data.data || []);
      setTotalCount(response.data.metadata.totalCount || 0);
    } catch (error) {
      console.error('API Error:', error);
      setResults([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Search Places</h1>

      <SearchBox
        query={query}
        setQuery={setQuery}
        onEnter={() => setDebouncedQuery(query)}
        ref={searchInputRef}
      />

      {loading && <div className="spinner"></div>}

      <ResultsTable
        results={results}
        debouncedQuery={debouncedQuery}
        itemsPerPage={itemsPerPage}
      />

      <PaginationControls
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        limit={limit}
        setLimit={setLimit}
        maxLimit={MAX_LIMIT}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}
export default App;
