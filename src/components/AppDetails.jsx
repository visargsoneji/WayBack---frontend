// src/components/AppDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppTimeline from './AppTimeline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomAccordionSummary = styled(AccordionSummary)({
  backgroundColor: '#95cf00', // Custom color
  color: 'black',
  width: '100%'
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AppDetails = () => {
  const query = useQuery();
  const appId = query.get('app_id');
  const [details, setDetails] = useState(null);
  const [versions, setVersions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!details){
          const responseDetails = await axios.get(`http://localhost:8000/api/details/${appId}`);
          setDetails(responseDetails.data);
        }
        
        if(!versions){
          const responseVersions = await axios.get(`http://localhost:8000/api/version-details/${appId}`);
          setVersions(responseVersions.data);
        }
        
      } catch (error) {
        console.error('Error fetching app details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (appId) {
      fetchData();
    }
  }, );

  if (loading) {
    return (
      <div className="results-list">
          <Skeleton variant="rounded" height={70}  style={{ margin: '10px 0' }} />
          <Skeleton variant="rounded" height={500} style={{ margin: '10px 0' }} />
      </div>
    );   
  }

  if (!details && !versions) {
    return <Typography>No details found</Typography>;
  }

  return (
    <div className="results-list">
        <Accordion defaultExpanded>
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}>
            <Typography sx={{ fontFamily: "Ubuntu", fontSize: "20px"}}><strong>{details.name} </strong>- {details.package_name}</Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
              <AppTimeline
                details={details}
                versions={versions}
              />
          </AccordionDetails>
        </Accordion>
    </div>
  );
};

export default AppDetails;
