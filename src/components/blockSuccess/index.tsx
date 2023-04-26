import React from "react";
import IconApprove from "../../icons/IconApprove";
import {
  StyledButton,
  StyledTitle,
  StyledWrapperIcon,
  StyledWrapperMain,
} from "./blockSuccess.styled";
import { BlockSuccessProps } from "./types";

const BlockSuccess = ({ title, setOpen }: BlockSuccessProps) => {
  return (
    <StyledWrapperMain>
      <StyledTitle>{title}</StyledTitle>
      <StyledWrapperIcon>
        <IconApprove />
      </StyledWrapperIcon>
      <StyledButton onClick={() => setOpen(false)}>
        Закрыть
      </StyledButton>
    </StyledWrapperMain>
  );
};

export default BlockSuccess;
