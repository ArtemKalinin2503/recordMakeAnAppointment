import styled from 'styled-components';
import { Button } from 'material-ui-core';
import { StyledItemWrapperProps, StyledStyledItemsTimeWrapperProps } from './types';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;

export const StyledItemsTimeWrapper = styled.div<StyledStyledItemsTimeWrapperProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;
  flex-direction: ${({ viewTypeIsTable }) =>
  viewTypeIsTable
    ? 'row'
    : 'column'};
`;

export const StyledItemWrapper = styled(Button)<StyledItemWrapperProps>`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid white;
  padding: 8px;
  background: ${({ isChecked }) =>
    isChecked
      ? '#7314d9'
      : 'none'};
  color: ${({ isChecked }) =>
    isChecked
      ? 'white'
      : '#7314d9'};

  &:active {
   background: #7314d9; 
   color: white;
  }

  &:disabled {
    background: none !important;
    color: #cbcbcb !important;
  }    
`

export const StyledInfoTimeSlots = styled.div`
  color: #7314d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: auto;
`;

export const StyledItemTime = styled.div`
  display: flex;
  align-items: center;
`

export const StyledButtonChangeView = styled(Button)`
  width: 100%;
  color: #7214d9;
  position: absolute;
  top: -45px;
  right: 15px;
  width: 250px;
`;


