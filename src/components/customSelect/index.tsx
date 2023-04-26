import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { useFormikContext } from 'formik';
import FormControl from '@mui/material/FormControl';
import { StyledMenuItem, StyledWrapperSelect } from './customSelect.styled';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CustomSelectProps } from './types';

export const CustomSelect = ({
  label, 
  listItems, 
  name, 
  isError,
  onChange,
  value
}: CustomSelectProps) => {

  const [selectedValue, setSelectedValue] = useState('');

  const { setFieldValue } = useFormikContext();

  const handleChange = (event: SelectChangeEvent) => {
    // специальный hook из formik который передаст данные в values в форме
    setFieldValue(name, event.target.value);
    if (onChange) {
      onChange(event.target.value)
    }

    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setSelectedValue(value)
  }, [value]);

  return (
    <StyledWrapperSelect>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={name}
          label={label}
          value={selectedValue}
          onChange={(event: any) => handleChange(event)}
          className={isError ? 'invalid' : ''}
        >
          {listItems?.map((item: any) => (
            <StyledMenuItem key={item.id} value={item.id}>{item.name}</StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledWrapperSelect>
  );
};

export default CustomSelect;
