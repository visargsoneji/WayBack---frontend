// // src/components/SearchBar.js
// import React, { useState, useEffect } from 'react';
// import { TextField, Button } from '@mui/material';
// import axios from 'axios';
// import './SearchBar.css';

// const SearchBar = ({ onSearchResults, currentPage, setCurrentPage, setLoading }) => {
//   const [query, setQuery] = useState('');
//   const [limit] = useState(20); // Set a limit for the number of results per page

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const fetchResults = async (page = 1) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:8000/api/search/`, {
//         params: { query, page, limit },
//         timeout: 10000
//       });
//       const totalCount = parseInt(response.headers['x-total-count'], 10) || 100;
//       onSearchResults(response.data, totalCount); // Pass the results to the parent component
//       setCurrentPage(page); // Notify parent about the page change
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     fetchResults(1); // Fetch results for the first page
//   };

//   useEffect(() => {
//     if (query) {
//       fetchResults(currentPage);
//     }
//   }, [currentPage]); // Re-fetch results on page change


//   return (
//     <div className="search-bar">
//       <TextField 
//         id="standard-basic"
//         label="Search APKs..." 
//         variant="standard" 
//         value={query} 
//         onChange={handleInputChange} 
//       />
//       <Button 
//         variant="contained" 
//         onClick={handleSearch} 
//         style={{ marginLeft: '15px', marginTop: '10px', backgroundColor: '#95cf00', color: '#fff' }}
//       >
//         Search
//       </Button>
//     </div>
//   );
// };
// export default SearchBar;

// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './SearchBar.css';

const SearchBar = ({ setCurrentPage, setSearchParams }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const page = 1;
    setCurrentPage(page);
    setSearchParams({
      query: query,
      page: page
    }); 
  };

  return (
        <div className="search-bar">
          <TextField 
            id="standard-basic"
            label="Search APKs..." 
            variant="standard" 
            value={query} 
            onChange={handleInputChange} 
          />
          <Button 
            variant="contained" 
            onClick={handleSearch} 
            style={{ marginLeft: '15px', marginTop: '10px', backgroundColor: '#95cf00', color: '#fff' }}
          >
            Search
          </Button>
        </div>
      );
};

export default SearchBar;
