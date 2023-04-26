import React from "react";
import { Box, Typography } from "material-ui-core";
import AuthorizationForm from "../../components/forms/authorizationForm";

const Authorization: React.FC = () => {
  return (
    <Box style={{ margin: 100 }}>
      <Typography 
        variant="h4" 
        component="h4"
        align="center"
      >
        Авторизация
      </Typography>
      <AuthorizationForm />
    </Box>
  );
};

export default Authorization;
