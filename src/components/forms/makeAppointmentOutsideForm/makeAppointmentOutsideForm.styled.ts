import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledWrapperForm = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  form {
    width: 100%;
  }
`;

export const StyledWrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 40px;
  width: 100%;
`;

export const StyledButtonSubmit = styled(Button)`
  color: white !important;
  background: #7314d9 !important;
  border-radius: 100px !important;
  padding: 13px 25px !important;
  font-weight: 600;
  font-size: 16px;
`;

export const StyledTextFieldWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-right: 20px;
  .MuiTextField-root {
    min-width: 350px;
    width: 100%;
    margin-top: 10px;
  }
  .MuiInput-formControl {
    width: 100%;
  }
  &:last-child {
    margin-right: 0;
  }

  .invalid {
    .MuiOutlinedInput-notchedOutline {
      border: 2px solid red;
    }
  }
`;

export const StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: red;
  margin-top: 10px;
  margin-left: 10px;
  width: 100%;
`;

export const StyledSelectWrapper = styled.div``;

export const StyledTitleSectionForm = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 20px;
  color: #313131;
  margin-top: 32px;
`;

export const StyledWrapperDatePicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledTimeZonesInfo = styled.div`
  color: #7314d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-top: 30px;
`;

export const StyledButtonNext = styled(Button)`
  color: white !important;
  background: #2f7c31 !important;
  border-radius: 10px !important;
  padding: 13px 25px !important;
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
`;

export const StyledCaptchaWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
