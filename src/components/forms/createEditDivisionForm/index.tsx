import React, { FC } from "react";
import {
  getIn,
  Field,
  Form,
  Formik,
  FieldProps,
  useFormikContext
} from "formik";
import * as yup from "yup";
import { TextField } from "material-ui-core";
import Box from "@mui/material/Box";
import { organizations, settingsDivision, timeZones } from "./consts";
import CheckboxList from "../../checkboxList";
import {
  CustomCheckboxListProps,
  CustomInputProps,
  CustomSelectProps,
  intialValuesCreateEditDivisionForm,
  ValuesCreateEditDivisionForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
  StyledWrapperDatePicker,
} from "./createEditDivisionForm.styled";
import CustomSelect from "../../customSelect";
import CustomDatePicker from "../../customDatePicker";


const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле"),
  title: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обязательное поле"),
  address: yup.string().required("Обязательное поле"),
  phone: yup.string().required("Обязательное поле"),
  email: yup.string().required("Обязательное поле")
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
          name={field.name}
          isError={!!touch && errorMessage}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле с календарем
const InputDatePicker: FC<CustomSelectProps & FieldProps>  = ({ field, form, ...props }) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;

  const { setFieldValue } = useFormikContext();

  const handleChange = (value: string) => {
    setFieldValue(field.name, value);
  }

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <CustomDatePicker 
          isDatePicker
          placeholderText={inProps.placeholderText} 
          handleChange={handleChange}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditDivisionForm: React.FC = () => {
  const initialValues: intialValuesCreateEditDivisionForm = {
    organization: "",
    name: "",
    title: "",
    description: "",
    address: "",
    coordinates: "",
    phone: "",
    email: "",
    timeZone: "",
    dateStart: "",
    dateEnd: "",
    settingsDivision: []
  };

  const onSubmit = (values: ValuesCreateEditDivisionForm) => {
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
            Организация
          </StyledTitleSectionForm>

          <Field
            name="organization"
            component={InputSelectList}
            fullWidth
            nameLabel="Организация"
            listItems={organizations}
          />

          <StyledTitleSectionForm>
            Данные подразделения 
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
            name="coordinates"
            component={Input}
            fullWidth
            nameLabel="Координаты"
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
            Глубина планирования
          </StyledTitleSectionForm>

          <StyledWrapperDatePicker>
            <Field
              name="dateStart"
              component={InputDatePicker}
              placeholderText="c"
              fullWidth
              nameLabel="Дата начала"
            />

            <Field
              name="dateEnd"
              component={InputDatePicker}
              placeholderText="по"
              fullWidth
              nameLabel="Дата окончания"
            />
            </StyledWrapperDatePicker>
  
          <StyledTitleSectionForm>
            Настройка подразделения
          </StyledTitleSectionForm>

          <Field
            name="settingDivision"
            component={InputCheckbox}
            fullWidth
            listItems={settingsDivision}
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

export default CreateEditDivisionForm;
