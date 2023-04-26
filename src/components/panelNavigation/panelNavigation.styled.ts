import { style } from "@mui/system";
import styled from "styled-components";

export const StyledWrapperPage = styled.div`
  display: flex;
`;

export const StyledSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  width: 118px;
  height: 100%;
  min-height: 100vh;
  padding: 10px;
  padding-left: 38px;
  box-sizing: border-box;
  padding-bottom: 150px;
  border-rigth: 1px solid;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledLogoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 108px;
  margin-top: 30px;
`;

export const StyledNav = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StyledListLinks = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;;
  flex-direction: column;
  list-style: none;
`;

export const StyledListItem = styled.li`
  display: flex;
`;