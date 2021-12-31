import React, { useState } from 'react';
import { FormControl, TextField, InputAdornment } from 'react/material';


const Input = (props) => {
  const { id, label, inputType, defaultValue, required, camelCased, onChange } =
    props;

  const [text, setText] = useState({
    value: defaultValue || '',
    error: required && !defaultValue ? '* required' : null,
  });

  const validateChange = (event) => {
    let value = event.target.value;
    let error = null;


    switch (inputType) {
      case 'currency':
      case 'number':
        error = isNaN(value) ? 'Only digits allowed' : null;
        break;
      case 'tel':
        error = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(value)
          ? null
          : 'Incorrect Phone mask';
        break;
      case 'text':
        break; 
      case 'email':
        error = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Incorrect Email mask';
        break;

      default:
        break;
    }


    if (value === '') {
      if (defaultValue) {
        value = defaultValue;
        error = null;
      } else if (required) {
        error = '* required';
      }
    }


    // update
    setText({ value, error });

    // inform  when valid
    onChange && onChange(event);
  };


  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        id={id}
        label={label}
        type={inputType}
        value={text.value}
        onChange={validateChange}
        size="small"
        error={!!text.error}
        helperText={text.error}
        InputProps={
          inputType === 'currency'
            ? {
                startAdornment: (
                  
    <InputAdornment position="start">$</InputAdornment>
                ),
              }
            : null
        }
      />
    </FormControl>
  );
};

export default Input;
