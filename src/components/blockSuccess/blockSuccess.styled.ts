import { Button } from 'material-ui-core';
import styled from 'styled-components';

export const StyledWrapperMain = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 24px;
  color: #23262F;
  margin-bottom: 32px;
  width: 100%;
`;

export const StyledWrapperIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 32px;
`;

export const StyledButton = styled(Button)`
  color: white;
  background: #7314D9;
  border-radius: 100px;
  padding: 13px 25px;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  max-width: 482px;
  margin: auto;
  &:hover {
    background: #7314D9;
  }
`;
