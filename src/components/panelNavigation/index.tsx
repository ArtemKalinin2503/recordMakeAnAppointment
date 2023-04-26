import React from "react";
import { NavLink } from "react-router-dom";
import IconLogo from "../../icons/IconLogo";
import { 
  StyledSectionLeft, 
  StyledLogoWrapper,
  StyledNav,
  StyledListLinks,
  StyledListItem
} from "./panelNavigation.styled";
import usePrivateRoutes from "../../hooks/usePrivateRoutes";
import { IRoutes } from "../../routes/types";

const PanelNavigation: React.FC = () => {

  // Роли (заменить на реальные когда будет готов бекенд)
  const userRoles: any = [localStorage.getItem('roles')];

  const [ privateRoutes ] = usePrivateRoutes(userRoles)

  return (
    <StyledSectionLeft>
      <StyledLogoWrapper>
        <IconLogo />
      </StyledLogoWrapper>
      <StyledNav>
        <StyledListLinks>
          {privateRoutes?.map((route: IRoutes) => (
            !route.isHeaden && (
              <StyledListItem key={route.path}>
              <NavLink to={route.path}>
                {route?.icon?.component}
              </NavLink>
            </StyledListItem> 
            )
          ))}
        </StyledListLinks>
      </StyledNav>
    </StyledSectionLeft>
  );
};

export default PanelNavigation;
