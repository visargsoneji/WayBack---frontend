// src/components/AppDetails.jsx
import React, { useState } from 'react';
import { Container, Typography, Grid, Divider, CircularProgress } from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './AppTimeline.css'
import CustomIcon from '../assets/android-color.svg';
import ReadMore from './ReadMore';
import ReadMore2 from './ReadMore2';
import './ResultsList.css';
import shareIcon from '../assets/share.svg'
import downloadIcon from '../assets/download.svg'
import { generateDownloadURL } from '../api/app/endpoints';

const AppTimeline = ({ details, versions }) => {
  const [downloading, setDownloading] = useState({})

  const handleDownload = async (hash) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login and check the FAQs to download the file');
      return;
    }
    setDownloading((prevState) => ({ ...prevState, [hash]: true }));
    try {
      // Step 1: Get the pre-signed download URL from the backend 
      const downloadUrl = await generateDownloadURL(hash) // The pre-signed URL from the backend
      // Step 2: Use the pre-signed URL for the download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', hash); // Set the filename for the download
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.parentNode.removeChild(link); // Cleanup
  
    } catch (error) {
      if (error.response.data.detail === 'Token expired') {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');  // Clear the expired token
        localStorage.setItem('lastVisitedPage', window.location.href);
        window.location.href = '/login';  // Redirect to login page
      } else {
        console.error('Error generating download URL:', error);
        alert(error.response.data.detail || 'Error generating download URL. Please try again later.');
      }
    } finally {
      setDownloading((prevState) => ({ ...prevState, [hash]: false }));
    }
  };
  

  if (!details) {
    return <Typography>No details found</Typography>;
  } 

  return (
    <Container style={{ width: '100%' }}>
      <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1" gutterBottom>
        <ReadMore>
          {details.text}
        </ReadMore><br />
      </Typography>
      <Divider />
      <Grid container spacing={2} textAlign="center" style={{ margin: "0.5px", marginBottom: "10px" }}>
        <Grid item xs={3}>
          <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>DEVELOPER</Typography>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1"><strong>{details.developer_id}</strong></Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
        <Grid item xs={3}>
          <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>CATEGORY</Typography>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1"><strong>{details.categories.join(" - ")}</strong></Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
        <Grid item xs={3}>
          <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>MATURITY</Typography>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1"><strong>{details.maturity.join(" - ")}</strong></Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
        <Grid item xs={2.6}>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1">
            <a href={`/search/details?app_id=${details.app_id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={shareIcon} alt="Share Icon" style={{ width: '30px', height: '30px'}} />
            </a>
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {versions ? (
        <>
          <br />
          <VerticalTimeline>
            {versions.map((version, index) => (
              <VerticalTimelineElement
                key={index}
                date={version.created_on.substring(0, 10)}
                icon={<img src={CustomIcon} alt="Custom Icon" style={{ width: '30px', height: '30px' }} />}
                iconStyle={{ background: '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                contentStyle={{ background: '#95cf00', color: '#000', wordWrap: 'break-word', fontFamily: 'Ubuntu' }}
                contentArrowStyle={{ borderRight: '7px solid  #95cf00' }}
              >
                {/* <h3 className="vertical-timeline-element-title">v {version.version}</h3><br></br> */}
                <div className="vertical-timeline-element-title-container">
                  <h3 className='version-title'>v {version.version}</h3>
                  <div className="sdk-info"> 
                    {version.min_sdk ? <div>Min SDK: {version.min_sdk}</div> : <p></p>}
                    {version.target_sdk ? <div>Target SDK: {version.target_sdk}</div> : <p></p> }
                  </div>
                </div>
                <Divider />
                <Grid container spacing={1} textAlign="center" style={{ margin: "0.5px", marginBottom: "10px", paddingTop: "5px" }}>
                  <Grid item xs={3.6}>
                    <Typography sx={{ fontFamily: "Ubuntu" }} style={{ fontSize: "10px" }}>RATING</Typography>
                    <Typography sx={{ fontFamily: "Ubuntu" }}><strong>{version.rating} ({version.total_ratings})</strong></Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
                  <Grid item xs={3.6}>
                    <Typography sx={{ fontFamily: "Ubuntu" }} style={{ fontSize: "10px" }}>SIZE</Typography>
                    <Typography sx={{ fontFamily: "Ubuntu" }}><strong>{formatSize(version.size)}</strong></Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
                  <Grid item xs={3.6}>
                    <Typography sx={{ fontFamily: "Ubuntu" }} style={{ fontSize: "10px" }}>DOWNLOAD</Typography>
                    {downloading[version.hash] ? (
                       <CircularProgress sx={{color:'black'}} size={34}/>
                    ) : (
                      <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1">
                        <img 
                          src={downloadIcon} 
                          alt="Download Icon" 
                          style={{ width: '30px', height: '30px', cursor: 'pointer' }} 
                          onClick={() => handleDownload(version.hash)}
                        />
                      </Typography> 
                    )}
                  </Grid>
                </Grid>
                <Divider />
                <br></br>
                {version.permissions.length > 0 ? (
                  <>
                    <Typography sx={{ fontFamily: "Ubuntu", fontSize: "8px" }}>Permissions: </Typography><br></br>
                    <ReadMore2 items={version.permissions}></ReadMore2>
                  </>) : (<></>
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </>
      ) : (
        <p>No version details available.</p>
      )}
    </Container>
  );
};

const formatSize = (sizeInBytes) => {
  if (sizeInBytes < 1000) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes >= 1000 && sizeInBytes < 1000000) {
    return `${(sizeInBytes / 1000).toFixed(2)} KB`;
  } else if (sizeInBytes >= 1000000 && sizeInBytes < 1000000000) {
    return `${(sizeInBytes / 1000000).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / 1000000000).toFixed(2)} GB`;
  }
};

export default AppTimeline;
