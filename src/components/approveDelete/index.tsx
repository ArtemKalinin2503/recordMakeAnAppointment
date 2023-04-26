import React from "react";
import IconQuestion from "../../icons/IconQuestion";
import { ApproveDeleteProps } from "./types";
import { StyledButtonApprove, StyledButtonCancel, StyledTitle, StyledWrapper, StyledWrapperIcon } from "./approveDelete.styled";

const ApproveDelete = ({ title, handleDelete, setOpen }: ApproveDeleteProps) => {
  return (
    <StyledWrapper>
      <StyledTitle>
        {title}
      </StyledTitle>
      <StyledWrapperIcon>
        <IconQuestion />
      </StyledWrapperIcon>
      <StyledButtonApprove onClick={handleDelete}>
        Подтвердить
      </StyledButtonApprove>
      <StyledButtonCancel onClick={() => setOpen(false)}>
        Отменить
      </StyledButtonCancel>
    </StyledWrapper>
  )
}

export default ApproveDelete;