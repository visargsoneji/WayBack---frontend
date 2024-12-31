import React, { useState, useEffect,lazy, Suspense } from 'react';
import { TextField, Button, Switch, FormControlLabel, IconButton, Box, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SearchBar.css';
import Joyride, { STATUS } from 'react-joyride';
import { getCategories, getMaturityLevels } from '../api/app/endpoints';

const AutocompleteSelect = lazy(() => import('./AutoCompleteSelect'));

const SearchBar = ({ setCurrentPage, setSearchParams, searchParams }) => {
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [packageName, setPackageName] = useState(searchParams.get('package_name') || '');
  const [developerName, setDeveloperName] = useState(searchParams.get('developer_name') || '');
  const [categories, setCategories] = useState(searchParams.get('categories') ? searchParams.get('categories').split(',') : []);
  const [maturity, setMaturity] = useState(searchParams.get('maturity') ? searchParams.get('maturity').split(',') : []);
  const [permissions, setPermissions] = useState(searchParams.get('permissions') || '');
  const [downloadable, setDownloadable] = useState(searchParams.get('downloadable') === 'false' ? false : true);
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
    {
      target: '#expand-advanced-search',
      content: 'Click here to reveal Advanced Search options!',
      spotlightPadding: 5,
      disableBeacon: true, // This prevents the dot indicator from appearing
      spotlightClicks: true, // Requires a click to advance the tour
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'query') setQuery(value);
    if (name === 'packageName') setPackageName(value);
    if (name === 'developerName') setDeveloperName(value);
    if (name === 'keyword') setKeyword(value)
    if (name === 'permissions') setPermissions(value)
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
    if (maturity.length > 0) newParams.maturity = maturity.join(',');
    if (permissions) newParams.permissions = permissions;
    if (keyword) newParams.keyword = keyword;

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
          id="keyword"
          name="keyword"
          label="Keyword Search"
          variant="standard"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{ width: isSmallScreen ? '100%' : 'auto', mb: isSmallScreen ? 2 : 0}}
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
          <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
            <TextField
              id="query"
              name="query"
              label="APK Name"
              variant="standard"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              sx={{
                width: isSmallScreen ? '100%' : '280px',
                marginBottom: '15px',
                marginLeft: '-5px',
                marginRight: '45px',
              }}
            />
            <TextField
              id="packageName"
              name="packageName"
              label="Package Name"
              variant="standard"
              value={packageName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              sx={{
                width: isSmallScreen ? '100%' : '280px',
                marginBottom: '15px',
                marginLeft: '-5px',
                marginRight: '45px',
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
              <TextField
                id="developerName"
                name="developerName"
                label="Developer Name"
                variant="standard"
                value={developerName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={{
                  width: isSmallScreen ? '100%' : '280px',
                  marginBottom: '15px',
                  marginLeft: '-5px',
                  marginRight: '45px',
                }}
              />
              <TextField
                id="permissions"
                name="permissions"
                label="Permissions"
                variant="standard"
                value={permissions}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={{
                  width: isSmallScreen ? '100%' : '280px',
                  marginBottom: '15px',
                  marginLeft: '-5px',
                  marginRight: '45px',
                }}
              />
            </Box>
            <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
            <Suspense fallback={<div>Loading...</div>}>
              <AutocompleteSelect
                label="Categories"
                fetchOptions={getCategories}
                selectedOptions={categories}
                setSelectedOptions={setCategories}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <AutocompleteSelect
                label="Maturity"
                fetchOptions={getMaturityLevels}
                selectedOptions={maturity}
                setSelectedOptions={setMaturity}
              />
            </Suspense>
            </Box>
          </Box>
          
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
            '&:hover': { backgroundColor: '#7fbf00' }
          }}
        >
          Search APKs
        </Button>
    </Box>
  );
};

export default SearchBar;
