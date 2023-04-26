import React from "react";
import { MoreDetailedProps } from "./types";
import {
  StyledButtonChange,
  StyledButtonDelete,
  StyledNameItem,
  StyledRow,
  StyledSectionLeft,
  StyledSectionRight,
  StyledTitle,
  StyledValueItem,
  StyledWrapperMain,
  StyledWrapperPopover,
} from "./moreDetailedUser.styled";
import PopoverChangeKeys from "../../popoverChangeKeys";
import { popoverTextNewUser } from "../../popoverChangeKeys/consts";

const MoreDetailedUser = ({ title, listItems, handleDelete, handleChange }: MoreDetailedProps) => {

  return (
    <StyledWrapperMain>
      <StyledTitle>{title}</StyledTitle>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Фамилия</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.lastname}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Имя</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.name}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Отчество</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.fullName}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Телефон</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.phone}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Часовый пояс</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.timeZone}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Уровень прав</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.role}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Организация</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.organizations}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledWrapperPopover>
        <PopoverChangeKeys 
          title="Сменить пароль пользователю"
          bodyText={popoverTextNewUser}
        />
      </StyledWrapperPopover>

      <StyledButtonChange onClick={handleChange}>
        Изменить
      </StyledButtonChange>

      <StyledButtonDelete onClick={handleDelete}>
        Удалить
      </StyledButtonDelete>
  
    </StyledWrapperMain>
  );
};

export default MoreDetailedUser;
