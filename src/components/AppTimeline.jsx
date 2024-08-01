// src/components/AppDetails.jsx
import React from 'react';
import { Container, Typography, Grid, Divider } from '@mui/material';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CustomIcon from '../assets/android-color.svg';
import ReadMore from './ReadMore';
import ReadMore2 from './ReadMore2';
import './ResultsList.css';
import shareIcon from '../assets/share.svg'

const AppTimeline = ({ details, versions }) => {
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
        <Grid item xs={4}>
          <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>DEVELOPER</Typography>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1"><strong>{details.developer_id}</strong></Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
        <Grid item xs={4}>
          <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>CATEGORY</Typography>
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1"><strong>{details.categories.join(" - ")}</strong></Typography>
        </Grid>
        <Divider orientation="vertical" flexItem style={{ margin: "5px" }} />
        <Grid item xs={3.6}>
          {/* <Typography sx={{ fontFamily: "Ubuntu", fontSize: "12px" }}>SHARE WITH FRIENDS</Typography> */}
          <Typography sx={{ fontFamily: "Ubuntu" }} variant="body1">
            <a href={`/search/details?app_id=${details.app_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                <h3 className="vertical-timeline-element-title">v {version.version}</h3><br></br>
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
                    <Typography sx={{ fontFamily: "Ubuntu" }}><strong>{version.hash.substring(0, 5)}</strong></Typography>
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
