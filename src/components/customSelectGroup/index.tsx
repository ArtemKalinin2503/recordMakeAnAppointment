import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ListItemIcon } from 'material-ui-core';
import { StyledTabName, StyledWrapperCheckbox, StyledWrapperSelect } from './customSelectGroup.styled';
import { CustomSelectGroupProps, ListItem } from './types';

const CustomSelectGroup = ({ listItems, label, defaultSelected, name, isEditThema }: CustomSelectGroupProps) => {
  const { setFieldValue } = useFormikContext();

  const [selectItem, setSelectItem] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(!isEditThema);

  // Модифицирую данные из listItems - так как нужно выбрать сразу select option
  // просто isChecked не приходит от бекенда, поэтому делаем на фронте
  const listItemsModify = listItems?.map((item: ListItem) => {
    let itemModify = {
      id: item.id,
      name: item.name,
      isChecked: false
    };
    return itemModify;
  });

  const [listItemsModifyState, setListItemsModifyState] = useState<any>(listItemsModify);

  const handleChange = () => {
    const itemIsSelected = listItemsModifyState.filter((item: ListItem) => item.isChecked).map((item: ListItem) => item.id);
    // Специальный hook из formik который передаст данные в values в форме
    setFieldValue(name, itemIsSelected);
    setIsSelectedAll(false);
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
      listItemsModifyState?.map((item: ListItem, index: number) => {
        return (
          item?.isChecked && (
            <StyledTabName>
              {[listItemsModifyState[index].name]}
            </StyledTabName>
          )
        );
      })
    );
  };

  // Выставление дефолтного значения при редактирование 
  useEffect(() => {
      if (defaultSelected) {
        const defaultItems: any = listItems?.map((filial: ListItem, index: number) => {
            if (defaultSelected.includes(filial.id)) {
              return {
                id: filial.id,
                name: filial.name,
                isChecked: true
             }
            } else {
              return {
                id: filial.id,
                name: filial.name,
                isChecked: false
             }
            }
        });
        setListItemsModifyState(defaultItems.filter((item: ListItem) => item !== undefined) ?? []);
      }
  }, []);

  // Нужно чтобы если изначально пришли выбраные данные
  // и пользователь решил ничего не менять отправить форму без изменений
  useEffect(() => {
    const itemIsSelected = selectItem?.filter((item: ListItem) => item?.isChecked)?.map((item: ListItem) => item.id);
    setFieldValue(name, itemIsSelected);
  }, [name, selectItem, setFieldValue]);

  useEffect(() => {
    setSelectItem(listItemsModifyState);
  }, [listItemsModifyState]);

  // Выбрать все
  useEffect(() => {
    const data = [...listItemsModifyState];
    if (isSelectedAll) {
      data?.map((item, index) => {
        data[index].isChecked = data[index].isChecked = true;
      })
      setListItemsModifyState(data);
    } else {
      data?.map((item, index) => {
        data[index].isChecked = data[index].isChecked = false;
      })
    }
  }, [isSelectedAll]);

  return (
    <StyledWrapperSelect>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel>
          {label}
        </InputLabel>
        <Select
          labelId={label}
          id="mutiple-checkbox"
          multiple
          value={selectItem}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={() => {
            return (
              renderValueSelect()
            );
          }}
        >
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox
                checked={isSelectedAll}
                onChange={() => setIsSelectedAll(!isSelectedAll)}
              />
            </ListItemIcon>
            <ListItemText primary="Выбрать все" />
          </MenuItem>
          {listItemsModifyState?.map((item: ListItem) => {
            return (
              <MenuItem
                key={item?.id}
                value={item?.id}
                onClick={() => handleClickItem(item)}
              >
                <StyledWrapperCheckbox>
                  <Checkbox
                    checked={item?.isChecked}
                    name={item?.name}
                  />
                  <ListItemText
                    primary={item?.name}
                  />
                </StyledWrapperCheckbox>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </StyledWrapperSelect>
  );
}

export default CustomSelectGroup;