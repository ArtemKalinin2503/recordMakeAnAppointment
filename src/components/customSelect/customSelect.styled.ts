import { MenuItem } from 'material-ui-core';
import styled from 'styled-components';

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

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  width: 100%;
  padding: 5px;
  justify-content: flex-start;
`;
