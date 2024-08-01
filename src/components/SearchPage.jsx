import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import ResultsList from './ResultsList';
import PaginationComponent from './PaginationComponent';
import SearchBar from './SearchBar';
import axios from 'axios';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const prevQueryRef = useRef();
    const prevPageRef = useRef();
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
        query: searchParams.get('query') || '',
        page: page
      });
    };
  
    const handleLoading = (loading) => {
      setIsLoading(loading);
      setSearchInitiated(true);
      setSearchExecuted(false)
    };
  
    const handleSearch = async (query, page) => {
      handleLoading(true);
      try {
        // console.log("from app.js")
        const response = await axios.get(`http://localhost:8000/api/search`, {
          params: { query, page, limit }
        });
        handleSearchResults(response.data, parseInt(response.headers['x-total-count'])); // Adjust according to your API response
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      const query = searchParams.get('query');
      const page = parseInt(searchParams.get('page')) || 1;
  
      if (prevQueryRef.current !== query || prevPageRef.current !== page) {
        prevQueryRef.current = query;
        prevPageRef.current = page;
        if (query) {
          handleSearch(query, page);
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