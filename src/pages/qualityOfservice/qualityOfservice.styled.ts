import styled from "styled-components";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledSectionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledTabsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #7314D9;
    border-radius: 5px;
    height: 5px;
  }
`;

export const StyledTab = styled(Tab)`
  svg {
    margin-right: 10px;
  }
`;
