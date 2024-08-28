// import React, { useState, lazy, Suspense } from 'react';
// import { TextField, Button, Switch, FormControlLabel, IconButton, Box } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import './SearchBar.css';

// const CategorySelect = lazy(() => import('./CategorySelect'));

// const SearchBar = ({ setCurrentPage, setSearchParams, searchParams }) => {
//   const [query, setQuery] = useState('');
//   const [packageName, setPackageName] = useState('');
//   const [developerName, setDeveloperName] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [downloadable, setDownloadable] = useState(true);
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'query') setQuery(value);
//     if (name === 'packageName') setPackageName(value);
//     if (name === 'developerName') setDeveloperName(value);
//   };

//   const handleDownloadableChange = (e) => {
//     setDownloadable(e.target.checked);
//   };

//   const handleSearch = async () => {
//     const page = 1;
//     setCurrentPage(page);

//     const newParams = {};
//     if (query) newParams.query = query;
//     if (packageName) newParams.package_name = packageName;
//     if (developerName) newParams.developer_name = developerName;
//     if (categories.length > 0) newParams.categories = categories.join(',');
//     newParams.downloadable = downloadable;
//     newParams.page = page;

//     setSearchParams(new URLSearchParams(newParams));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const toggleAdvanced = () => {
//     setShowAdvanced(!showAdvanced);
//   };

//   return (
//     <Box className="search-bar">
//       <Box display="flex" alignItems="center" mb={2}>
//         <TextField
//           id="query"
//           name="query"
//           label="APK Name"
//           variant="standard"
//           value={query}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//         <TextField
//           id="packageName"
//           name="packageName"
//           label="Package Name"
//           variant="standard"
//           value={packageName}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           style={{ marginLeft: '15px' }}
//         />
//         <IconButton onClick={toggleAdvanced} style={{ marginLeft: '15px' }}>
//           <ExpandMoreIcon />
//         </IconButton>
//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           style={{ marginLeft: '15px', backgroundColor: '#95cf00', color: '#fff' }}
//         >
//           Search
//         </Button>
        
//       </Box>
//       {showAdvanced && (
//         <Box className="advanced-search" display="flex" flexDirection="column" alignItems="flex-start">
//           <TextField
//             id="developerName"
//             name="developerName"
//             label="Developer Name"
//             variant="standard"
//             value={developerName}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             style={{ marginBottom: '15px' }}
//           />
//           <Suspense fallback={<div>Loading...</div>}>
//             <CategorySelect selectedCategories={categories} setSelectedCategories={setCategories} />
//           </Suspense>
//           <FormControlLabel
//             control={<Switch checked={downloadable} onChange={handleDownloadableChange} />}
//             label="Downloadable"
//             style={{ marginBottom: '15px', alignSelf:"center"}}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect,lazy, Suspense } from 'react';
import { TextField, Button, Switch, FormControlLabel, IconButton, Box, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SearchBar.css';
import Joyride, { STATUS } from 'react-joyride';

const CategorySelect = lazy(() => import('./CategorySelect'));

const SearchBar = ({ setCurrentPage, setSearchParams, searchParams }) => {
  const [query, setQuery] = useState('');
  const [packageName, setPackageName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [categories, setCategories] = useState([]);
  const [downloadable, setDownloadable] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [runTour, setRunTour] = useState(true);

  // Media query to detect small screens
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  useEffect(() => {
    // Check if the tour has already been completed
    const hasSeenTour = localStorage.getItem('hasSeenTour');

    if (!hasSeenTour) {
      setRunTour(true); // Run the tour if the user hasn't seen it yet
    }
  }, []);

  const steps = [
    // {
    //   target: '#query',
    //   content: 'Enter the APK name here to search for Android APKs.',
    //   spotlightPadding: 5, // Increases the padding around the spotlight to highlight the entire input
    // },
    // {
    //   target: '#packageName',
    //   content: 'Enter the package name if you want to narrow your search further.',
    //   spotlightPadding: 5,
    // },
    {
      target: '#expand-advanced-search',
      content: 'Click here to reveal Advanced Search options!',
      spotlightPadding: 5,
      disableBeacon: true, // This prevents the dot indicator from appearing
      spotlightClicks: true, // Requires a click to advance the tour
    },
    // {
    //   target: '#developerName',
    //   content: 'Enter the developer name to search for APKs by a specific developer.',
    //   spotlightPadding: 5,
    // },
    // {
    //   target: '#categorySelect',
    //   content: 'Select one or more categories to filter your search.',
    //   spotlightPadding: 5,
    // },
    // {
    //   target: '#downloadable-switch',
    //   content: 'Toggle this switch to filter APKs that are downloadable.',
    //   spotlightPadding: 5,
    // }
  ];

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

  const handleJoyrideCallback = (data) => {
    const { status, action, index } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || localStorage.getItem('hasSeenTour')) {
      setRunTour(false); // Stop the tour after it's completed or skipped
      localStorage.setItem('hasSeenTour', 'true'); // Set flag in localStorage
    }

    // Handle specific step actions (e.g., toggling advanced search on click)
    if (action === 'next' && index === 2) {
      setShowAdvanced(true); // Show advanced options after the third step
    }
  };

  return (
    <Box className="search-bar" sx={{ flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      {/* Basic Search Fields */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            backgroundColor: '#e3ffeb',
            overlayColor: '#e0e0e0',
            primaryColor: '#000',
            textColor: '#004a14',
            zIndex: 1000,
          },
        }}
        callback={handleJoyrideCallback}
      />
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems="center" mb={2}>
        <TextField
          id="query"
          name="query"
          label="APK Name"
          variant="standard"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{ width: isSmallScreen ? '100%' : 'auto', mb: isSmallScreen ? 2 : 0 }}
        />
        <TextField
          id="packageName"
          name="packageName"
          label="Package Name"
          variant="standard"
          value={packageName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{ width: isSmallScreen ? '100%' : 'auto', mb: isSmallScreen ? 2 : 0, ml: isSmallScreen ? 0 : '15px' }}
        />
        <IconButton id="expand-advanced-search" onClick={toggleAdvanced} sx={{ ml: isSmallScreen ? 0 : '15px', mb: isSmallScreen ? 2 : 0 }}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      {showAdvanced && (
        <Box
          className="advanced-search"
          display="flex"
          flexDirection="column" // Stack vertically on small screens
          alignItems="flex-start"
          // width="100%"
          mt={isSmallScreen ? 2 : 0} // Add margin on top for small screens
        >
          <TextField
            id="developerName"
            name="developerName"
            label="Developer Name"
            variant="standard"
            value={developerName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{
              width: isSmallScreen ? '100%' : '300px',
              marginBottom: '15px'
            }}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <CategorySelect sx={{marginBottom: '15px'}} selectedCategories={categories} setSelectedCategories={setCategories} />
          </Suspense>
          <FormControlLabel
            control={<Switch id="downloadable-switch" checked={downloadable} onChange={handleDownloadableChange} />}
            label="Downloadable"
            sx={{ marginBottom: '15px', alignSelf: isSmallScreen ? "flex-start" : "center" }}
          />
        </Box>
      )}
      <Button
          id="search-button"
          variant="contained"
          onClick={handleSearch}
          sx={{
            ml: isSmallScreen ? 0 : '15px',
            mt: isSmallScreen ? 2 : 0,
            backgroundColor: '#95cf00',
            color: '#fff',
          }}
        >
          Search APKs
        </Button>
    </Box>
  );
};

export default SearchBar;
