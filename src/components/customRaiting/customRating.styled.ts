import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from 'material-ui-core';

export const StyledMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledRating = styled(Rating)(({ theme }) => ({
  width: 64,
  height: 64
}));

export const StyledRadioButton = styled(FormControlLabel)`
  .MuiTypography-root {
    font-size: 20px;
    margin: 5px;
  }
`;

export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
`;

export const StyledRadioItem = styled(Radio)`
  span {
    color: #7214d9;
  }
`;

export const StyledRadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  max-width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StyledWrapperRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButtom = styled(Button)`
  color: white;
  width: 142px;
  height: 40px;
  background: #7314D9;
  border-radius: 100px;
  margin-top: 30px;
  margin-bottom: 10px;
  &:hover {
    background: #7314D9;
  }
`;