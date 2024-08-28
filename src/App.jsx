// src/App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import AppDetails from './components/AppDetails';
import SearchPage from './components/SearchPage';
import FAQ from './components/FAQ';
import Login from './components/Login';
import { Box } from '@mui/material';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/details" element={<AppDetails />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
