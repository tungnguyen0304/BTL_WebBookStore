import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, IconButton } from '@mui/material';


const SearchWrapper = styled('div')({
    width: '100%',
    maxWidth: '80%',
    margin: 'auto',
    position: 'relative',
    backgroundColor: '#F2F4F4',
});

export default function NormalSearchBar ({label, searchText, setSearchText, handleSearch}) {
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };  

  return (
    <SearchWrapper>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        size='small'
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}        
      />
    </SearchWrapper>
  );
};

NormalSearchBar.propTypes = {
    label: PropTypes.string,
    searchText: PropTypes.string.isRequired,
    setSearchText: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
};