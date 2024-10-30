import React, { useState } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import './ResultsList.css';
import AppTimeline from './AppTimeline';
import { getAppDetails, getVersionDetails } from '../api/app/endpoints';

const bgcolors = ['#95cf00']; // #466100
const colors = ['#000000'];

const CustomAccordionSummary = styled(AccordionSummary)(({ bgcolor, color }) => ({
  backgroundColor: bgcolor,
  color: color,
  width: '100%',
}));

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
        const appDetails = await getAppDetails(appId);
        setDetails((prevDetails) => ({
          ...prevDetails,
          [appId]: appDetails,
        }));
      }

      if (!versions[appId]) {
        const versionDetails = await getVersionDetails(appId);
        setVersions((prevVersions) => ({
          ...prevVersions,
          [appId]: versionDetails,
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
      {results.map((result, index) => (
        <Accordion key={result.id} onChange={() => handleAccordionChange(result.app_id)}>
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon/>} bgcolor={bgcolors[index % bgcolors.length]} color={colors[index % colors.length]}>
            <Typography sx={{ fontFamily: "Ubuntu", fontSize: "19px"}}><strong>{result.name} </strong>- {result.package_name}</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            {loading[result.app_id] ? (
              <div>
                <Skeleton variant="rounded" height={100} style={{ margin: '10px 0' }} />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{ borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
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
