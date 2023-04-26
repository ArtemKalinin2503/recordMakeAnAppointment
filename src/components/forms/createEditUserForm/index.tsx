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
import CustomSelect from "../../customSelect";
import CustomRadioGroup from "../../customRadioGroup";
import SelectTags from "../../selectTags";
import PopoverChangeKeys from "../../popoverChangeKeys";
import { popoverTextNewUser } from "../../popoverChangeKeys/consts";
import { organizations, roles, timeZones } from "./consts";
import {
  CustomInputProps,
  CustomSelectProps,
  intialValuesCreateEditUserForm,
  ValuesCreateEditUserForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
} from "./createEditUserForm.styled";

const validationSchema = yup.object({
  lastname: yup.string().required("Обязательное поле"),
  name: yup.string().required("Обязательное поле"),
  fullName: yup.string().required("Обязательное поле"),
  phone: yup.string().required("Обязательное поле"),
  email: yup.string().required("Обязательное поле"),
  timeZone: yup.object().required("Обязательное поле"),
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

// Поле select
const InputSelectList: FC<CustomSelectProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;
  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <CustomSelect
          label={inProps.nameLabel}
          listItems={inProps.listItems}
          name="timeZone"
          isError={!!touch && errorMessage}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле radio кнопок
const InputRadioGroup: FC<CustomSelectProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;
  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <CustomRadioGroup 
          listItems={inProps.listItems} 
          name="role"
          isError={!!touch && errorMessage}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле выбора с тегами и поиском
const InputTags: FC<CustomSelectProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;
  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <SelectTags 
          listItems={inProps.listItems} 
          nameField="organizations"
          label="Добавить организацию"
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditUserForm: React.FC = () => {
  const initialValues: intialValuesCreateEditUserForm = {
    lastname: "",
    name: "",
    fullName: "",
    phone: "",
    email: "",
    timeZone: "",
    role: "",
    organizations: [],
  };

  const onSubmit = (values: ValuesCreateEditUserForm) => {
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
            Данные пользователя
          </StyledTitleSectionForm>

          <Field
            name="lastname"
            component={Input}
            fullWidth
            nameLabel="Фамилия"
          />

          <Field
            name="name"
            component={Input}
            fullWidth
            nameLabel="Имя"
          />

          <Field
            name="fullName"
            component={Input}
            fullWidth
            nameLabel="Отчество"
          />

          <Field
            name="phone"
            component={Input}
            fullWidth
            nameLabel="Телефон"
          />

          <Field
            name="email"
            component={Input}
            fullWidth
            nameLabel="Email"
          />

          <StyledTitleSectionForm>
            Часовой пояс
          </StyledTitleSectionForm>

          <Field
            name="timeZone"
            component={InputSelectList}
            fullWidth
            nameLabel="Выберите часовый пояс"
            listItems={timeZones}
          />
          
          <StyledTitleSectionForm>
            Уровень прав
          </StyledTitleSectionForm>

          <Field
            name="role"
            component={InputRadioGroup}
            fullWidth
            nameLabel=""
            listItems={roles}
          />
          <StyledTitleSectionForm>
            Организация
          </StyledTitleSectionForm>

          <Field
            name="organizations"
            component={InputTags}
            fullWidth
            nameLabel=""
            listItems={organizations}
          />
          <StyledTitleSectionForm>
            Пароль
          </StyledTitleSectionForm>

          <PopoverChangeKeys 
            title="Сменить пароль пользователю"
            bodyText={popoverTextNewUser}
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

export default CreateEditUserForm;
