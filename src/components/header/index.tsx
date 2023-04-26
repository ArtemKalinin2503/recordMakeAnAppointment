import React from "react";
import { useNavigate } from 'react-router-dom';
import IconExit from "../../icons/IconExit";
import { HeaderProps } from "./types";
import { 
  StyledHeaderIconWrraper, 
  StyledHeaderSection, 
  StyledHeaderTitle, 
  StyledWrapperHeader,
  StyledUserInfoWrapper,
  StyledUserName,
  StyledUserPosition,
  StyledWrapperIconExit
} from "./header.styled";

const Header = ({ title, children }: HeaderProps) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/login');
  };

  return (
    <StyledWrapperHeader>
      <StyledHeaderSection>
        <StyledHeaderIconWrraper>
          {children}
        </StyledHeaderIconWrraper>
        <StyledHeaderTitle>
          {title}
        </StyledHeaderTitle>
      </StyledHeaderSection>
      <StyledHeaderSection>
        <StyledUserInfoWrapper>
          <StyledUserName>
            User_Name
          </StyledUserName>
          <StyledUserPosition>
            Главный администратор
          </StyledUserPosition>
        </StyledUserInfoWrapper>
        <StyledWrapperIconExit onClick={handleExit}>
          <IconExit />
        </StyledWrapperIconExit>
      </StyledHeaderSection>
    </StyledWrapperHeader>
  );
};

export default Header;
