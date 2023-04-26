import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxListProps } from './types';

const CheckboxList = ({ listItems, nameField, defaultSelected }: CheckboxListProps) => {

  const { setFieldValue } = useFormikContext();

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  // Выставление значения по-умолчанию
  useEffect(() => {
    let selectedItem: string[] = [];
    listItems?.map((item) => {
      if (defaultSelected && !!item.id === defaultSelected[item.id]) {
        selectedItem.push(item.id)
      }
    })
    setCheckedValues(selectedItem);
  }, [defaultSelected]);

  function handleChange(checkedId: string) {
    const newNames = checkedValues?.includes(checkedId)
      ? checkedValues?.filter((id: string) => id !== checkedId)
      : [...(checkedValues ?? []), checkedId];

    setCheckedValues(newNames);
    setFieldValue(nameField, newNames)
  }

  console.log('checkedValues: ', checkedValues);
 
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          {listItems?.map((item: any) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleChange(item.id)} 
                    name={item.id}
                    checked={checkedValues.includes(item.id)}
                  />
                }
                label={item.name}
              />
            )
          )}
        </FormGroup>
      </FormControl>  
    </Box>
  );
}

export default CheckboxList;