// src/components/Footer.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'white',
        color: '#95cf00',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          &copy; 2024 SEFCOM
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
