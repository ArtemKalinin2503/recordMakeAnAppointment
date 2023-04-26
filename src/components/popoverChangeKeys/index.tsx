import React from "react";
import IconKeys from "../../icons/IconKeys";
import CustomPopover from "../customPopover";
import { StyledBodyPopover, StyledLabel, StyledPopoverSection, StyledPopoverWrapper } from "./popoverChangeKeys.styled";
import { PopoverChangeKeysProps } from "./types";

const PopoverChangeKeys = ({ title, bodyText }: PopoverChangeKeysProps) => {
  return (
    <StyledPopoverWrapper>
    <StyledPopoverSection>
      <IconKeys />
      <StyledLabel>
        {title}
      </StyledLabel>
    </StyledPopoverSection>
    <StyledPopoverSection>
      <CustomPopover 
        label=""
        body={<StyledBodyPopover>{bodyText}</StyledBodyPopover>}
      />
    </StyledPopoverSection>
  </StyledPopoverWrapper>
  )
}

export default PopoverChangeKeys;