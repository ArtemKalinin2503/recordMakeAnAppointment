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
} from "./moreDetailedMakeAppointment.styled";

const MoreDetailedMakeAppointment = ({ title, listItems, handleDelete, handleChange }: MoreDetailedProps) => {
  return (
    <StyledWrapperMain>
      <StyledTitle>{title}</StyledTitle>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Номер записи</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.entryNumber}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>День</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.dayOfTheWeek}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Дата</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.date}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Время</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.fromToTimeInterval}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Клиент</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.clientName}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow> 

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Телефон</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.mobilePhone}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>E-mail</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.email}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Тема записи</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          <StyledValueItem>{listItems?.topicDesc}</StyledValueItem>
        </StyledSectionRight> 
      </StyledRow>

      
      <StyledRow>
        <StyledSectionLeft>
          <StyledNameItem>Статус</StyledNameItem>
        </StyledSectionLeft> 
        <StyledSectionRight>
          {listItems?.active && (
            <StyledValueItem>Действует</StyledValueItem>
          )}
        </StyledSectionRight> 
      </StyledRow>    

      {/* <StyledButtonChange onClick={handleChange}>
        Изменить
      </StyledButtonChange>

      <StyledButtonDelete onClick={handleDelete}>
        Удалить
      </StyledButtonDelete> */}
  
    </StyledWrapperMain>
  );
};

export default MoreDetailedMakeAppointment;
