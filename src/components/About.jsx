// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const About = () => {
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        About WayBack APK
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {'A comprehensive wayback machine for Android APKs.'}
      </Typography>
      <Typography variant="body1">
        WayBack APK allows you to search and download old versions of Android applications. Browse through millions of apps and find the exact version you need.
      </Typography>
      <Box mt={4}>
        <Button 
            variant="contained" 
            component={Link}
            to="/search" 
            style={{ marginLeft: '15px', marginTop: '10px', backgroundColor: '#95cf00', color: '#fff' }}
        >Start Searching</Button>
        {/* <Button variant="contained" color="primary" component={Link} to="/search">
          Start Searching
        </Button> */}
      </Box>
    </Container>
  );
};

export default About;
