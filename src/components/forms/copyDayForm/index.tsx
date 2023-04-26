import React, { FC, useState } from "react";
import {
  getIn,
  Field,
  Form,
  Formik,
  FieldProps,
} from "formik";
import Box from "@mui/material/Box";
import {
  CreateCopyDayFormProps,
  CustomSelectProps,
  intialValuesCreateCopyDayForm,
  ValuesCreateCopyDayForm,
} from "./types";
import CustomDataPickerStatic from "../../customDataPickerStatic";
import { StyledTextFieldWrapper, StyledError, StyledAnnotation, StyledButtonSubmit, StyledButtonCancel } from "./copyDayForm.styled";

// Поле со статичным календарем
const InputDatePickerStatic: FC<CustomSelectProps & FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: "100%" }}>
        <CustomDataPickerStatic
          minDate={new Date()}
          name={field.name}
          // @ts-ignore
          onChange={(value: any) => inProps.onChange(value)}
          busyDays={inProps.busyDays}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CopyDayForm = ({ annotation, setOpen, handleSubmit, busyDays, selectRowId }: CreateCopyDayFormProps) => {
  const initialValues: intialValuesCreateCopyDayForm = {
    receptionDay: "",
  };

  const [selectDate, setSelectDate] = useState(new Date());

  const onSubmit = (values: ValuesCreateCopyDayForm) => {
    handleSubmit(values);
  };

  console.log('selectRowId: ', selectRowId);
  console.log('selectDate: ', selectDate);

  return (
    <Box margin="auto" sx={{ width: '100%', overflow: 'scroll', maxHeight: '620px' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            name="receptionDay"
            component={InputDatePickerStatic}
            placeholderText=""
            fullWidth
            nameLabel=""
            onChange={(event: any) => setSelectDate(event)}
            busyDays={busyDays}
          />

          <StyledAnnotation>
            {annotation}
          </StyledAnnotation>
          <Box mt={3}>
            <StyledButtonSubmit 
              variant="contained" 
              fullWidth 
              type="submit"
            >
              Создать
            </StyledButtonSubmit>
            <StyledButtonCancel
              variant="contained" 
              fullWidth
              onClick={() => setOpen(false)}
            >
              Отменить
            </StyledButtonCancel>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CopyDayForm;
