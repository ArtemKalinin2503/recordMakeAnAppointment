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
} from "./moreDetailedQualityOfservice.styled";

const MoreDetailedQualityOfservice = ({ title, listItems, handleDelete, handleChange }: MoreDetailedProps) => {

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
          <StyledNameItem>Вопрос</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.question}</StyledValueItem>
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
          <StyledNameItem>Срок получения</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.dateReceipt}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Текстовое поле</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.text}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Текст рядом с полем</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.questionDetailed}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Статус</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems.status}</StyledValueItem>
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

export default MoreDetailedQualityOfservice;
