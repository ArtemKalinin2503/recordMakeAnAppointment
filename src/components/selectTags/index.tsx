import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { StyledWrapperSelect, StyledTabName, StyledWrapperCheckbox, StyledSearchMessage } from './selectTags.styled';
import { ListItem, SelectTagsProps } from './types';
import { InputAdornment, TextField } from 'material-ui-core';
import IconSearch from '../../icons/IconSearch';

export const SelectTags = ({ listItems, nameField, label }: SelectTagsProps) => {
  const { setFieldValue } = useFormikContext();

  const [selectItem, setSelectItem] = useState<any>([]);

  // Модифицирую данные из listItems - так как нужно выбрать сразу select option
  // просто isChecked не приходит от бекенда, поэтому делаем на фронте

  const listItemsModify = listItems?.map((item: ListItem) => {
    let itemModify = {
      id: item.id,
      name: item.name,
      isChecked: false
    };
    // Если нужно, чтобы сразу были выбраны табы - например от бека пришли данные какие табы выбрать сразу
    // offersUuid?.map((uuid) => {
    //   // eslint-disable-next-line no-return-assign
    //   return (
    //     offer.id === uuid && (
    //       itemModify = {
    //         id: offer.id,
    //         value: offer.name,
    //         isChecked: true
    //       }
    //     )
    //   );
    // });
    return itemModify;
  });

  const [listItemsModifyState, setListItemsModifyState] = useState(listItemsModify);

  const [listItemsSearch, setListItemsSearch] = useState('');

  const handleChange = () => {
    const itemIsSelected = listItemsModifyState.filter((item) => item.isChecked).map((item) => item.id);
    // Специальный hook из formik который передаст данные в values в форме
    setFieldValue(nameField, itemIsSelected);
  };

  // При клике на option меняем флаг isChecked на противоположный
  const handleClickItem = (item: ListItem) => {
    const data = [...listItemsModifyState];
    data?.map((itemData, index) => {
      if (itemData.id === item.id) {
        data[index].isChecked = !data[index].isChecked;
      } 
    })
    setListItemsModifyState(data);
  };

  // Собираем табы с выбраными позициями, чтобы дальше подставить в input
  const renderValueSelect = () => {
    return (
      listItemsModifyState?.map((item, index) => {
        return (
          item.isChecked && (
            <StyledTabName>
              {[listItemsModifyState[index].name]}
            </StyledTabName>
          )
        );
      })
    );
  };

  // Нужно чтобы если изначально пришли выбраные данные
  // и пользователь решил ничего не менять отправить форму без изменений
  useEffect(() => {
    const itemIsSelected = listItemsModifyState.filter((item) => item.isChecked).map((item) => item.id);
    setFieldValue(nameField, itemIsSelected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectItem(listItemsModifyState);
  }, [listItemsModifyState]);

  // Поиск
  const filtredLisItems = listItemsModifyState.filter((item) => {
    return item.name.toLowerCase().includes(listItemsSearch.toLowerCase());
  })

  return (
    <StyledWrapperSelect>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel htmlFor="age-native-simple">
          {label}
        </InputLabel>
        <Select
          labelId={label}
          id="mutiple-checkbox"
          multiple
          value={selectItem}
          name={nameField}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={() => {
            return (
              renderValueSelect()
            );
          }}
        >
          <TextField 
            id="search" 
            type="search"
            variant="outlined"
            onChange={(event) => setListItemsSearch(event.target.value)} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              )
            }}
            placeholder="Введите название"
            fullWidth
          />
          {!filtredLisItems.length && (
            <StyledSearchMessage>
              Нет результата...
            </StyledSearchMessage>
          )}
          {filtredLisItems?.map((item: ListItem) => {
            return (
              <MenuItem
                key={item.id}
                value={item.id}
                onClick={() => handleClickItem(item)}
              >
                <StyledWrapperCheckbox>
                  <Checkbox
                    checked={item.isChecked}
                    name={item.name}
                  />
                  <ListItemText
                    primary={item.name}
                  />
                </StyledWrapperCheckbox>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </StyledWrapperSelect>
  );
};

export default SelectTags;
