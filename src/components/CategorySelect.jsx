// src/components/CategorySelect.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Chip } from '@mui/material';

const CategorySelect = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Autocomplete
      id='categorySelect'
      multiple
      style={{
        width: '300px',
        '.MuiAutocomplete-listbox': {
            maxHeight: '200px',
        },
        marginBottom: '25px',
        }}
      options={categories}
      getOptionLabel={(option) => option}
      value={selectedCategories}
      onChange={(event, newValue) => setSelectedCategories(newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} variant="standard" label="Categories" />}
    />
  );
};

export default CategorySelect;
