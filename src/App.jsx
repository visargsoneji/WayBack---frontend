// // src/App.jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
// import Header from './components/Header';
// import SearchBar from './components/SearchBar';
// import ResultsList from './components/ResultsList';
// import PaginationComponent from './components/PaginationComponent';
// import Footer from './components/Footer';
// import About from './components/About';
// import AppDetails from './components/AppDetails'; 
// import FAQ from './components/FAQ';
// import { Box, Container } from '@mui/material';
// import './App.css';

// const SearchPage = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchInitiated, setSearchInitiated] = useState(false);
//   const [searchExecuted, setSearchExecuted] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearchResults = (results, totalCount) => {
//     setSearchResults(results);
//     setTotalPages(Math.ceil(totalCount / 20)); 
//     setSearchExecuted(true); // Set flag to indicate search has been executed
//     setIsLoading(false); // Stop loading after data is fetched
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleLoading = (loading) => {
//     setIsLoading(loading);
//     setSearchInitiated(true);
//   };

//   return (
//     <Container component="main" sx={{ flex: 1, py: 2 }}>
//       <SearchBar
//         onSearchResults={handleSearchResults}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         setLoading={handleLoading}
//       />
//       {searchInitiated && (
//         <>
//           <ResultsList results={searchResults} isLoading={isLoading} />
//           {searchExecuted && (
//             <Box mb={1}>
//               <PaginationComponent
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </Box>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Box display="flex" flexDirection="column" minHeight="100vh">
//         <Header />
//         <Routes>
//           <Route path="/" element={<About />} />
//           <Route path="/search" element={<SearchPage />} />
//           <Route path="/search/details" element={<AppDetails />} />
//           <Route path="/faq" element={<FAQ />} />
//         </Routes>
//         <Footer />
//       </Box>
//     </Router>
//   );
// };

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import AppDetails from './components/AppDetails';
import SearchPage from './components/SearchPage';
import FAQ from './components/FAQ';
import { Box } from '@mui/material';
import './App.css';

const App = () => {
  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/details" element={<AppDetails />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
