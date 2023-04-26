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
} from "./moreDetailedOrganization.styled";

const MoreDetailedOrganization = ({ title, listItems, handleDelete, handleChange }: MoreDetailedProps) => {

  return (
    <StyledWrapperMain>
      <StyledTitle>{title}</StyledTitle>

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
          <StyledNameItem>Полное официальное название</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.fullName}</StyledValueItem>
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
          <StyledNameItem>Телефон</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.phone}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Веб-интерфейс самообслуживания</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.webInterface}</StyledValueItem>
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

export default MoreDetailedOrganization;
