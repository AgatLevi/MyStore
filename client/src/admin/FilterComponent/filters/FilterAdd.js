import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Alert } from 'react';
import Input from '../../components/Input';
import SelectorAutocomplete from '../../components/SelectorAutocomplete';


const FilterAdd = (props) => {
  const { filters, onCreateFilter, alert } = props;

  useEffect(() => {
    setShowAlert(alert);
  }, [alert]);

  const [inputs, setInputs] = useState(['', '', false]);

  // TEXT FIELDS 
  const onInputChange = (event) => {
    onSelect(+event.target.id, event.target.value);
  };

  // SELECT FIELDS
  const [variants, setVariants] = useState([]);
  const onSelect = (id, value) => {
    let state = inputs;
    state[+id] = value ? value : '';

    
    if (id === 0) {
      
      state[1] = '';
      
      setVariants(
        filters.filterList
          .filter((item) => item.type === state[0])
          .map((item) => item.variant)
      );
    }

    state[2] = state[0] !== '' && state[1] !== '';
    setInputs(state);
    setShowAlert(null);
  };


  const [showAlert, setShowAlert] = useState(null);
  const onSubmitClicked = () => {
    if (inputs[2] && onCreateFilter) {
      onCreateFilter && onCreateFilter({ type: inputs[0], variant: inputs[1] });
    } else {
      setShowAlert({ type: 'error', message: 'Missing required fields' });
    }
  };

  
  return (
    <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
      <Grid
        container
        sx={{ width: 1 / 3 }}
        spacing={2}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Grid item sx={{ width: 1 }}>
          Create new filter
        </Grid>
        <Grid item sx={{ width: 1 }}>
          {filters && filters.filterTypes.length > 0 ? (
            <SelectorAutocomplete
              id={'0'}
              label="Filter type"
              options={filters.filterTypes}
              onSelect={onSelect}
            />
          ) : (

            <Input
              inputType={'text'}
              id={'0'}
              label="Filter type"
              onChange={onInputChange}
              required
              camelCased
            />
          )}
        </Grid>
        <Grid item sx={{ width: 1 }}>
          {filters && filters.filterTypes.length > 0 ? (
            <SelectorAutocomplete
              sx={{ width: 1 }}
              options={variants}
              id={'1'}
              label="Filter variant"
              onSelect={onSelect}
              disabled={inputs[0] === ''}
            />
          ) : (
            <Input
              inputType={'text'}
              id={'1'}
              label="Filter variant"
              onChange={onInputChange}
              required
              camelCased
            />
          )}

        </Grid>
        <Grid item sx={{ width: 1 }}>
          <Button
            sx={{ width: 1 }}
            variant="contained"
            color="success"
            onClick={onSubmitClicked}
          >
            Submit
          </Button>

        </Grid>
        {showAlert && (
          <Grid item sx={{ width: 1 }}>
            <Alert severity={showAlert.type} color={showAlert.type}>
              {showAlert.message}
            </Alert>
          </Grid>
        )}
        
      </Grid>
    </Box>
  );
};

export default FilterAdd;
