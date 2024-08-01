import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import './ReadMore.css'; // Import CSS for ReadMore component

const ReadMore = ({ children, maxLines = 3 }) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * maxLines;
      if (element.scrollHeight > maxHeight) {
        setTruncated(true);
      }
    }
  }, [children, maxLines]);

  const toggleReadMore = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <span>
      <span
        ref={contentRef}
        style={{
          maxHeight: expanded ? 'none' : `${maxLines * 1.5}em`,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          display: 'block'
        }}
      >
        {children}
      </span>
      {truncated && (
        <span>
          <Button variant="text" onClick={toggleReadMore}>
            {expanded ? 'Read Less' : 'Read More...'}
          </Button>
        </span>
      )}
    </span>
  );
};

export default ReadMore;
