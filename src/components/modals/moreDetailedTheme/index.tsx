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
} from "./moreDetailedTheme.styled";

const MoreDetailedTheme = ({ title, listItems, handleDelete, handleChange }: MoreDetailedProps) => {

  return (
    <StyledWrapperMain>
      <StyledTitle>{title}</StyledTitle>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Организация</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.organization}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Наименование</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.name}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Название</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.title}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Адрес</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.address}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Описание</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.description}</StyledValueItem>
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
          <StyledNameItem>E-mail</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.email}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>  

      <StyledButtonChange onClick={handleChange}>
        Изменить
      </StyledButtonChange>

      <StyledButtonDelete onClick={handleDelete}>
        Удалить
      </StyledButtonDelete>
  
    </StyledWrapperMain>
  );
};

export default MoreDetailedTheme;
