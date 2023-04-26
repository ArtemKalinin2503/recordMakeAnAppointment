import React, { FC } from "react";
import {
  getIn,
  Field,
  Form,
  Formik,
  FieldProps,
} from "formik";
import * as yup from "yup";
import { TextField } from "material-ui-core";
import Box from "@mui/material/Box";
import {
  CustomCheckboxListProps,
  CustomInputProps,
  intialValuesCreateEditOrganizationForm,
  ValuesCreateEditOrganizationForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
} from "./createEditOrganizationForm.styled";
import { settingsOrganization } from "./consts";
import CheckboxList from "../../checkboxList";

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле"),
  title: yup.string().required("Обязательное поле"),
  fullName: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обязательное поле"),
  address: yup.string().required("Обязательное поле"),
  phone: yup.string().required("Обязательное поле")
});

// Текстовое поле
const Input: FC<CustomInputProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;
  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <TextField
          {...field}
          label={inProps.nameLabel}
          variant="outlined"
          fullWidth
          className={touch && errorMessage ? "invalid" : ""}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле с checkbox
const InputCheckbox: FC<CustomCheckboxListProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;
  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <CheckboxList 
          listItems={inProps.listItems}
          nameField="settingOrganization"
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditOrganizationForm: React.FC = () => {
  const initialValues: intialValuesCreateEditOrganizationForm = {
    name: "",
    title: "",
    fullName: "",
    description: "",
    address: "",
    phone: "",
    webInterface: "",
    settingOrganization: []
  };

  const onSubmit = (values: ValuesCreateEditOrganizationForm) => {
    console.log("values: ", values);
  };

  return (
    <Box margin="auto" sx={{ width: '100%', overflow: 'scroll', maxHeight: '620px' }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <StyledTitleSectionForm>
            Данные организации
          </StyledTitleSectionForm>

          <Field
            name="name"
            component={Input}
            fullWidth
            nameLabel="Наименование"
          />

          <Field
            name="title"
            component={Input}
            fullWidth
            nameLabel="Название"
          />

          <Field
            name="fullName"
            component={Input}
            fullWidth
            nameLabel="Полное официальное название"
          />

          <Field
            name="description"
            component={Input}
            fullWidth
            nameLabel="Описание"
          />

          <Field
            name="address"
            component={Input}
            fullWidth
            nameLabel="Адрес"
          />

          <Field
            name="phone"
            component={Input}
            fullWidth
            nameLabel="Телефон"
          />

          <Field
            name="webInterface"
            component={Input}
            fullWidth
            nameLabel="Веб-интерфейс самообслуживания"
          />

          <StyledTitleSectionForm>
            Настройки организации
          </StyledTitleSectionForm>

          <Field
            name="settingOrganization"
            component={InputCheckbox}
            fullWidth
            listItems={settingsOrganization}
          />

          <Box mt={3}>
            <StyledButtonSubmit 
              variant="contained" 
              fullWidth 
              type="submit"
            >
              Создать
            </StyledButtonSubmit>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateEditOrganizationForm;
