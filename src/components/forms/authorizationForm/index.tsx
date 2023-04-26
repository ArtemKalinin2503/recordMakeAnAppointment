import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "material-ui-core";
import Box from "@mui/material/Box";
import {
  intialValuesAuthorizationForm,
  ValuesAuthorizationForm,
} from "./types";
import AuthVerify from "../../../hooks/useAutorized";
import { useMutation } from "@apollo/client";
import { AUTH_LOGIN } from "../../../api/mutations/login/useLogin";
import { IAuthLogin, IAuthLoginInput } from "../../../api/mutations/login/types";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email должен быть валидный")
    .required("Обязательное поле"),
  password: yup
    .string()
    .min(4, "Пароль минимум 4-е символа")
    .required("Обязательное поле"),
});

const AuthorizationForm: React.FC = () => {

  const navigate = useNavigate();

  const [login, { data: loginData }] = useMutation<IAuthLogin, IAuthLoginInput>(AUTH_LOGIN);
  
  const formik = useFormik<intialValuesAuthorizationForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ValuesAuthorizationForm) => {
      login({
        variables: {
          email: values.email,
          password: values.password
        }
      })
    }
  });

  useEffect(() => {
    if (loginData && Object.keys(loginData.login.token)) {
      localStorage.setItem('token', JSON.stringify(loginData.login.token));
      localStorage.setItem('userId', loginData.login.idUser);
      localStorage.setItem('roles', loginData.login.roles);
      navigate('/users');
    }
  }, [loginData])

  return (
    <Box
      sx={{
        maxWidth: "500px"
      }}
      margin="auto"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box mt={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Войти
          </Button>
        </Box>
      </form>
      <AuthVerify />
    </Box>
  );
};

export default AuthorizationForm;
