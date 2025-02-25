// src/components/FAQ.jsx
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Box } from '@mui/material';
import faqData from '../assets/faqData.json';

const FAQ = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Ubuntu' }}>
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{ backgroundColor: 'ButtonShadow' }}
            >
              <Typography sx={{ fontFamily: 'Ubuntu'}}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#95cf00' }}>
            <Typography
              sx={{ fontFamily: 'Ubuntu', whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;