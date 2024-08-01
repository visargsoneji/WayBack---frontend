import React, { useState } from 'react';
import { Button } from '@mui/material';
import './ReadMore2.css'; // Import the CSS file

const ReadMore2 = ({ items, maxLength = 3 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <ul className="read-more-list">
        {items.slice(0, expanded ? items.length : maxLength).map((item, index) => (
          <li key={index} className="read-more-item">{item}</li>
        ))}
      </ul>
      {items.length > maxLength && (
        <Button variant="text" onClick={toggleReadMore}>
          {expanded ? 'Read Less' : 'Read More...'}
        </Button>
      )}
    </div>
  );
};

export default ReadMore2;
