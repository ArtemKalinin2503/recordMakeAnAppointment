import React, { FC } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "material-ui-core";
import { SelectChangeEvent } from "@mui/material";
import { organizations } from "./consts";
import { CustomSelectProps } from "./types";
import {
  StyledFiltersWrapper,
  StyledBox,
  StyledSectionFields,
} from "./divisionsFilters.styled";

const DivisionsFilters = () => {

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
            labelId={name}
            label={label}
            onChange={(event) => onChange(event)}
          >
            {listItems?.map((item: any) => (
              <MenuItem key={item.id} value={item}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledBox>
    );
  };

  const handleGetOrganization = (event: SelectChangeEvent) => {
    console.log("filters value: ", event.target.value);
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

export default DivisionsFilters;
