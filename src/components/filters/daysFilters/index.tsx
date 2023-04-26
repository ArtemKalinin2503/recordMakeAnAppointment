import React, { FC } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
} from "material-ui-core";
import { SelectChangeEvent } from "@mui/material";
import CustomDatePicker from "../../customDatePicker";
import { CustomSelectProps, daysFiltersInt } from "./types";
import {
  StyledFiltersWrapper,
  StyledBox,
  StyledTextFieldWrapper,
  StyledSectionFields,
  StyledSectionDatePickers,
  StyledMenuItem,
} from "./daysFilters.styled";

const DaysFilters = ({ 
  organizations, 
  selectOrganization, 
  setSelectOrganization, 
  filials,
  selectedFilial,
  setSelectedFilial,
  setSelectedDateStart,
  setSelectedDateEnd
}:daysFiltersInt) => {


  const InputSelectList: FC<CustomSelectProps> = ({
    name,
    label,
    listItems,
    onChange,
    value
  }) => {
    return (
      <StyledBox>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
              labelId={name}
              label={label}
              value={value}
              onChange={(event) => onChange(event)}
            >
              {listItems?.map((item: any) => (
                <StyledMenuItem key={item.id} value={item.id}>
                  {item?.name}
                </StyledMenuItem>
              ))}
            </Select>
        </FormControl>
      </StyledBox>
    );
  };

  const handleGetOrganization = (event: any) => {
    setSelectOrganization(event.target.value)
  };

  const handleGetDivision = (event: SelectChangeEvent) => {
    setSelectedFilial(event.target.value);
  };

  const handleGetStartDate = (value: string) => {
    setSelectedDateStart(value);
  };

  const handleGetEndDate = (value: string) => {
    setSelectedDateEnd(value);
  };

  return (
    <StyledFiltersWrapper>
      <StyledSectionFields>
        <InputSelectList
          name="Выберите организацию"
          label="Организация"
          listItems={organizations}
          isError={false}
          onChange={handleGetOrganization}
          value={selectOrganization}
        />

        <InputSelectList
          name="Выберите подразделение"
          label="Подразделение"
          listItems={filials}
          isError={false}
          onChange={handleGetDivision}
          value={selectedFilial}
        />
      </StyledSectionFields>

      <StyledSectionDatePickers>      
        <StyledTextFieldWrapper>
          <Box>
            <CustomDatePicker
              isDatePicker
              placeholderText="c"
              handleChange={handleGetStartDate}
            />
          </Box>
        </StyledTextFieldWrapper>

        <StyledTextFieldWrapper>
          <Box>
            <CustomDatePicker
              isDatePicker
              placeholderText="по"
              handleChange={handleGetEndDate}
            />
          </Box>
        </StyledTextFieldWrapper>
      </StyledSectionDatePickers>
    </StyledFiltersWrapper>
  );
};

export default DaysFilters;
