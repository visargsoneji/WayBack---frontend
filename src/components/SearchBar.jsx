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

// // src/components/SearchBar.jsx
// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import './SearchBar.css';

// const SearchBar = ({ setCurrentPage, setSearchParams }) => {
//   const [query, setQuery] = useState('');

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearch = async () => {
//     const page = 1;
//     setCurrentPage(page);
//     setSearchParams({
//       query: query,
//       page: page
//     }); 
//   };

//   return (
//         <div className="search-bar">
//           <TextField 
//             id="standard-basic"
//             label="Search APKs..." 
//             variant="standard" 
//             value={query} 
//             onChange={handleInputChange} 
//           />
//           <Button 
//             variant="contained" 
//             onClick={handleSearch} 
//             style={{ marginLeft: '15px', marginTop: '10px', backgroundColor: '#95cf00', color: '#fff' }}
//           >
//             Search
//           </Button>
//         </div>
//       );
// };

// export default SearchBar;

import React, { useState, lazy, Suspense } from 'react';
import { TextField, Button, Switch, FormControlLabel, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SearchBar.css';

const CategorySelect = lazy(() => import('./CategorySelect'));

const SearchBar = ({ setCurrentPage, setSearchParams, searchParams }) => {
  const [query, setQuery] = useState('');
  const [packageName, setPackageName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [categories, setCategories] = useState([]);
  const [downloadable, setDownloadable] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'query') setQuery(value);
    if (name === 'packageName') setPackageName(value);
    if (name === 'developerName') setDeveloperName(value);
  };

  const handleDownloadableChange = (e) => {
    setDownloadable(e.target.checked);
  };

  const handleSearch = async () => {
    const page = 1;
    setCurrentPage(page);

    const newParams = {};
    if (query) newParams.query = query;
    if (packageName) newParams.package_name = packageName;
    if (developerName) newParams.developer_name = developerName;
    if (categories.length > 0) newParams.categories = categories.join(',');
    newParams.downloadable = downloadable;
    newParams.page = page;

    setSearchParams(new URLSearchParams(newParams));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <Box className="search-bar">
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          id="query"
          name="query"
          label="APK Name"
          variant="standard"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <TextField
          id="packageName"
          name="packageName"
          label="Package Name"
          variant="standard"
          value={packageName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ marginLeft: '15px' }}
        />
        <IconButton onClick={toggleAdvanced} style={{ marginLeft: '15px' }}>
          <ExpandMoreIcon />
        </IconButton>
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{ marginLeft: '15px', backgroundColor: '#95cf00', color: '#fff' }}
        >
          Search
        </Button>
        
      </Box>
      {showAdvanced && (
        <Box className="advanced-search" display="flex" flexDirection="column" alignItems="flex-start">
          <TextField
            id="developerName"
            name="developerName"
            label="Developer Name"
            variant="standard"
            value={developerName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{ marginBottom: '15px' }}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <CategorySelect selectedCategories={categories} setSelectedCategories={setCategories} />
          </Suspense>
          <FormControlLabel
            control={<Switch checked={downloadable} onChange={handleDownloadableChange} />}
            label="Downloadable"
            style={{ marginBottom: '15px', alignSelf:"center"}}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
