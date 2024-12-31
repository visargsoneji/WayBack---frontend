import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import ResultsList from './ResultsList';
import PaginationComponent from './PaginationComponent';
import SearchBar from './SearchBar';
import { getSearchResults } from '../api/app/endpoints'

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const prevParamsRef = useRef();
    const limit = 20; // Fixed limit value
  
    const handleSearchResults = (results, totalCount) => {
      setTotalCount(totalCount);
      setSearchResults(results);
      setTotalPages(Math.ceil(totalCount / limit)); 
      setSearchExecuted(true); // Set flag to indicate search has been executed
      setIsLoading(false); // Stop loading after data is fetched
      setCurrentPage(parseInt(searchParams.get('page')) || 1);
    };
  
    const handlePageChange = (page) => {
      setSearchExecuted(false);
      setCurrentPage(page);
      setSearchParams({
        keyword: searchParams.get('keyword') || '',
        query: searchParams.get('query') || '',
        package_name: searchParams.get('package_name') || '',
        developer_name: searchParams.get('developer_name') || '',
        categories: searchParams.get('categories') || '',
        maturity: searchParams.get('maturity') || '',
        permissions: searchParams.get('permissions') || '',
        downloadable: searchParams.get('downloadable') || 'true',
        page: page
      });
    };
  
    const handleLoading = (loading) => {
        setSearchResults([]);
        setIsLoading(loading);
        setSearchInitiated(true);
        setSearchExecuted(false);
    };
  
    const handleSearch = async (params) => {
        handleLoading(true);
        console.log('Initiated searching ...')
        try {
          const { searchResults, totalResults } = await getSearchResults(params, limit);
          handleSearchResults(searchResults, totalResults);
          // const response = await axios.get('http://localhost:8000/api/search', {
          //   params: { ...params, limit }
          // });
          // handleSearchResults(response.data, parseInt(response.headers['x-total-count']));
           // Adjust according to your API response
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
    };
    
  
    useEffect(() => {
        const params = {
          query: searchParams.get('query') || '',
          package_name: searchParams.get('package_name') || '',
          developer_name: searchParams.get('developer_name') || '',
          categories: searchParams.get('categories') || '',
          maturity: searchParams.get('maturity') || '',
          permissions: searchParams.get('permissions') || '',
          keyword: searchParams.get('keyword') || '',
          downloadable: searchParams.get('downloadable') || 'true',
          page: parseInt(searchParams.get('page')) || 1
        };
        if (JSON.stringify(prevParamsRef.current) !== JSON.stringify(params)) {
          prevParamsRef.current = params;
          if (params.keyword || params.query || params.package_name || params.developer_name || params.categories || params.maturity || params.permissions) {
            handleSearch(params);
          } else {
            setSearchExecuted(false);
            setSearchInitiated(false);
            setIsLoading(false);
            setSearchResults([]);
          }
        }
      }, [searchParams]);
  
    return (
      <Container component="main" sx={{ flex: 1, py: 2 }}>
        <SearchBar
          setCurrentPage={setCurrentPage}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        {searchInitiated && (
          <>
            {searchExecuted && (
              <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <Typography sx={{ fontFamily: "Ubuntu", fontSize: "15px" }}>
                <strong> {((currentPage-1) * limit + 1)} - {totalCount < currentPage * 20 ? totalCount: currentPage * 20} of {totalCount} Apps</strong>
              </Typography>
            </Box>
            )}
            <ResultsList results={searchResults} isLoading={isLoading} />
            {searchExecuted && (
              <Box mb={1}
              sx={{
                py: 2,
                mt: 'auto',
                bottom: 0
              }}>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    );
  };

export default SearchPage;