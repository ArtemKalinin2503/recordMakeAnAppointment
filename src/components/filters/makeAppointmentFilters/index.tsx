import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
} from "material-ui-core";
import CustomDatePicker from "../../customDatePicker";
import { MakeAppointmentFiltersProps } from "./types";
import {
  StyledFiltersWrapper,
  StyledBox,
  StyledTextFieldWrapper,
  StyledSectionFields,
  StyledSectionDatePickers,
  StyledMenuItem,
} from "./makeAppointmentFilters.styled";
import { UserOrganization } from "../../../api/query/users/types";
import { Filial } from "../../../api/query/organizations/types";

const MakeAppointmentFilters = ({ 
    organizations, 
    filials, 
    setSelectOrganization, 
    setSelectFilial,
    selectOrganization,
    selectFilial,
    setDateStart,
    setDateEnd,
  }:MakeAppointmentFiltersProps) => {


  const handleGetOrganization = (event: any) => {
    setSelectOrganization(event.target.value);
  };

  const handleGetDivision = (event: any) => {
    setSelectFilial(event.target.value);
  };

  const handleGetStartDate = (value: string) => {
    setDateStart(value);
  };

  const handleGetEndDate = (value: string) => {
    setDateEnd(value);
  };

  return (
    <StyledFiltersWrapper>
      <StyledSectionFields>
        <StyledBox>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Организация</InputLabel>
            <Select
              labelId="Выберите организацию"
              label="Организация"
              value={selectOrganization}
              onChange={(event) => handleGetOrganization(event)}
            >
              {organizations?.map((item: UserOrganization) => (
                <StyledMenuItem key={item.organizationId} value={item.organizationId}>
                  {item?.organizationName}
                </StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>

        <StyledBox>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Подразделения</InputLabel>
            <Select
              labelId="Выберите подразделение"
              label="Подразделения"
              value={selectFilial}
              onChange={(event) => handleGetDivision(event)}
            >
              {filials?.map((item: Filial) => (
                <StyledMenuItem key={item.IdDept} value={item.IdDept}>
                  {item?.nameDept}
                </StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
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

export default MakeAppointmentFilters;
