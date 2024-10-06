import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

const AutocompleteSelect = ({ label, fetchOptions, selectedOptions, setSelectedOptions }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error(`Error fetching ${label.toLowerCase()} options:`, error);
      }
    };

    fetchData();
  }, [fetchOptions, label]);

  return (
    <Autocomplete
      id={`${label.toLowerCase()}Select`}
      multiple
      options={options}
      style={{
        width: '280px',
        '.MuiAutocomplete-listbox': {
            maxHeight: '200px',
        },
        marginBottom: '15px',
        marginLeft: '-5px',
        marginRight: '45px'
        }}
      getOptionLabel={(option) => option}
      value={selectedOptions}
      onChange={(event, newValue) => setSelectedOptions(newValue)}
      renderTags={(value, getTagProps) => 
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} variant="standard" label={label} />}
    />
  );
};

export default AutocompleteSelect;
