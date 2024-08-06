import React, { useState } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import axios from 'axios';
import './ResultsList.css';
import AppTimeline from './AppTimeline';


const CustomAccordionSummary = styled(AccordionSummary)({
  backgroundColor: '#95cf00', // Custom color
  color: 'black',
  width: '100%'
});

const ResultsList = ({ results, isLoading }) => {
  const [details, setDetails] = useState({});
  const [versions, setVersions] = useState({});
  const [loading, setLoading] = useState({});

  const handleAccordionChange = async (appId) => {
    if (details[appId] && versions[appId]) {
      return; // If details are already fetched, do nothing
    }

    setLoading((prevLoading) => ({ ...prevLoading, [appId]: true }));

    try {
      if (!details[appId]) {
        const responseDetails = await axios.get(`http://localhost:8000/api/details/${appId}`);
        setDetails((prevDetails) => ({
          ...prevDetails,
          [appId]: responseDetails.data,
        }));
      }

      if (!versions[appId]) {
        const responseVersions = await axios.get(`http://localhost:8000/api/version-details/${appId}`);
        setVersions((prevVersions) => ({
          ...prevVersions,
          [appId]: responseVersions.data,
        }));
      }
    } catch (error) {
      console.error('Error fetching details or versions:', error);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [appId]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="results-list">
        {Array.from(new Array(20)).map((_, index) => (
          <Skeleton variant="rounded" height={50} key={index} style={{ margin: '10px 0' }} />
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <Typography>No results found</Typography>;
  }

  return (
    <div className="results-list">
      {results.map((result) => (
        <Accordion key={result.id} onChange={() => handleAccordionChange(result.app_id)}>
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}>
            <Typography sx={{ fontFamily: "Ubuntu", fontSize: "19px"}}><strong>{result.name} </strong>- {result.package_name}</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            {loading[result.app_id] ? (
              <div>
                <Skeleton variant="rounded" height={100} style={{ margin: '10px 0' }} />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                </Grid>
              </div>    
            ) : (
              <AppTimeline
                details={details[result.app_id]}
                versions={versions[result.app_id]}
              />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};


export default ResultsList;
