// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}  // Initial state: transparent and slightly below the view
      animate={{ opacity: 1, y: 0 }}   // Animate to: fully opaque and in the original position
      transition={{ duration: 1.5 }}   // Transition duration: 0.5 seconds
    >
    <Container component="main" sx={{ mt: 8, mb: 4 }} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            About WayBack APK
          </Typography>
          <Divider sx={{ mb: 3, borderColor: '#95cf00' }} />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontFamily: "Ubuntu", color: '#95cf00', mb: 3 }} variant="h4" component="h2" gutterBottom>
            {'A comprehensive wayback machine for Android APKs.'}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#666' }}>
            WayBack APK offers a dataset that consists of <strong>5,091,553 APK files</strong> meticulously collected and archived over the years. This extensive collection serves as a valuable resource for researchers, developers, and security analysts who are looking to study and understand the evolution of Android applications. Whether you're interested in examining app versions, permissions, or security vulnerabilities, this dataset provides a robust foundation for your research activities.
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#666' }}>
            Our mission is to support the academic and research community by providing access to this dataset for non-commercial research purposes. By exploring the historical changes in app features and behavior, researchers can gain insights into mobile app development trends, security practices, and user privacy implications over time.
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: '#666' }}>
            To access this dataset, please refer to our <Link to="/faq" style={{ textDecoration: 'none', color: '#95cf00', fontWeight: 'bold' }}>FAQs page</Link>, where you will find detailed instructions on the application process, eligibility criteria, and guidelines for proper usage. We are committed to fostering a collaborative environment where knowledge can be freely shared to advance the field of mobile security and software analysis.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box mt={4} >
            <Button 
              variant="contained" 
              component={Link}
              to="/search" 
              sx={{ backgroundColor: '#95cf00', color: '#fff', '&:hover': { backgroundColor: '#7fbf00' } }}
            >
              Start Exploring
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </motion.div>
  );
};

export default About;
