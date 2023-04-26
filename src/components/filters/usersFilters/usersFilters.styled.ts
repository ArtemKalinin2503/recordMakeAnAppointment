import styled from 'styled-components';

export const StyledFiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const StyledWrapperSelect = styled.div`
  display: flex;
  width: 100%;

  .MuiFormControl-root {
    width: 100%;
    margin: 0;
  }

  .invalid {
    .MuiOutlinedInput-notchedOutline {
      border: 2px solid  red;
    }
  }
`;

export const StyeldWrapperItem = styled.div`
    display: flex;
    width: 100%;
`;

export const StyledBox = styled.div`
  max-width: 350px; 
  min-width: 300px;  
  margin-bottom: 20px; 
  margin-right: 20px;
`;

export const StyledTextFieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: 20px;
    .MuiTextField-root {
      min-width: 350px;
      width: 100%;
    }
    .MuiInput-formControl {
      width: 100%;
    }
    &:last-child {
      margin-right: 0;
    }
    
    .invalid {
      .MuiOutlinedInput-notchedOutline {
        border: 2px solid  red;
      }
    }
`;

export const StyledSectionFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
