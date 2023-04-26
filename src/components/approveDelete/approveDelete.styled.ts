import { Button } from 'material-ui-core';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #313131;
  text-align: center;
`;

export const StyledWrapperIcon = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 32px;
`;

export const StyledButtonApprove = styled(Button)`
  color: white;
  background: #7314D9;
  border-radius: 100px;
  padding: 13px 25px;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  max-width: 482px;
  margin: auto;
  margin-top: 32px;
  &:hover {
    background: #7314D9;
  }
`;

export const StyledButtonCancel = styled(Button)`
  display: flex;
  width: 100%;
  border: 1px solid #AE3F00;
  margin-top: 20px;
  background: #FFFFFF;
  border-radius: 100px;
  padding: 13px 25px;
  font-weight: 600;
  font-size: 16px;
  color: #7314D9;
  max-width: 482px;
  margin: auto;
  margin-top: 32px;
  &:hover {
    background: #FFFFFF;
  }
`;