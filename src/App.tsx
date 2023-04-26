import React from "react";
import AuthVerify from "./hooks/useAutorized";
import PrivateRoute from "./route/PrivateRoute";
import GuestRoute from "./route/GuestRoute";
import PanelNavigation from "./components/panelNavigation";
import Header from "./components/header";
import { StyledWrapperPage, StyledSectionRight, StyledSectionLeft } from "./pages/styles/main-styles";
import PRIVATE_ROUTES from "./routes/private.config";
import { useLocation } from "react-router-dom";
import { IRoutes } from "./routes/types";

const App: React.FC = () => {

  const location = useLocation();

  const selectedSection: IRoutes[] = PRIVATE_ROUTES.filter((route) => route.path.includes(location.pathname));

  return (
    <StyledWrapperPage>
      
      {selectedSection.length >= 1  && (
        <StyledSectionLeft>
          <PanelNavigation />
        </StyledSectionLeft>
      )}

      <StyledSectionRight>
        {selectedSection.length >= 1 && (
          <Header title={selectedSection[0]?.breadcrumb}>
            {selectedSection[0]?.icon?.component}
          </Header>
        )}

        <GuestRoute />
        <PrivateRoute />

        <AuthVerify />

      </StyledSectionRight>
    </StyledWrapperPage>
  );
};

export default App;
