import React, { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
} from "material-ui-core";
import { UserOrganization } from "../../../api/query/users/types";
import { CustomSelectProps, themasFiltersInt } from "./types";
import {
  StyledFiltersWrapper,
  StyledBox,
  StyledSectionFields,
  StyledMenuItem,
} from "./themesFilters.styled";

const ThemesFilters = ({ organizations, selectOrganization, setSelectOrganization }:themasFiltersInt) => {

  const InputSelectList: FC<CustomSelectProps> = ({
    name,
    label,
    listItems,
    onChange,
  }) => {
    return (
      <StyledBox>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>{label}</InputLabel>
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
    );
  };

  const handleGetOrganization = (event: any) => {
    setSelectOrganization(event.target.value);
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
        />
      </StyledSectionFields>
    </StyledFiltersWrapper>
  );
};

export default ThemesFilters;
