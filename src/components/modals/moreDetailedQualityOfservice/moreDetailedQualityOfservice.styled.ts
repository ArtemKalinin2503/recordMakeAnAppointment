import { Button } from "material-ui-core";
import styled from "styled-components";

export const StyledWrapperMain = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const StyledSectionLeft = styled.div`
  display: flex;
`;

export const StyledSectionRight = styled.div`
  display: flex;
`;

export const StyledTitle = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 36px;
  color: #23262F;
`;

export const StyledNameItem = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #313131;
`;

export const StyledValueItem = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #313131;
  text-align: right;
  max-width: 240px;
`;

export const StyledButtonChange = styled(Button)`
  width: 100%;
  margin-top: 20px;
  background: #7314D9;
  border-radius: 100px;
  padding: 13px 25px;
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  &:hover {
    background: #7314D9;
  }
`

export const StyledButtonDelete = styled(Button)`
  width: 100%;
  border: 1px solid #AE3F00;
  margin-top: 20px;
  background: #FFFFFF;
  border-radius: 100px;
  padding: 13px 25px;
  font-weight: 600;
  font-size: 16px;
  color: #7314D9;
  &:hover {
    background: #FFFFFF;
  }
`