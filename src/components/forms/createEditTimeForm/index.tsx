import React, { FC, useEffect } from "react";
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
import CustomSelect from "../../customSelect";
import CustomDatePicker from "../../customDatePicker";
import {
  CreateTimeSlotFormProps,
  CustomInputProps,
  CustomSelectProps,
  intialValuesCreateEditTimeForm,
  ValuesCreateEditTimeForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
  StyledWrapperDatePicker,
} from "./createEditTimeForm.styled";
import { CREATE_TIME_SLOT } from "../../../api/mutations/createTimeSlot/useCreateTimeSlot";
import { useMutation } from "@apollo/client";
import { CreateTimeSlotIn, CreateTimeSlotInput } from "../../../api/mutations/createTimeSlot/types";
import moment from "moment";
import { EDIT_TIME } from "../../../api/mutations/editTime/useEditTime";
import { EditTimeIn, EditTimeInput } from "../../../api/mutations/editTime/types";
import dayjs from "dayjs";

const validationSchema = yup.object({
  nameRage: yup.string().required("Обязательное поле"),
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
          name={field.name}
          value={inProps.defaultItems}
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
          isTimePicker={inProps.typePicker === 'timePicker' && true}
          placeholderText={inProps.placeholderText} 
          handleChange={handleChange}
          isDatePicker={inProps.typePicker === 'datePicker' && true}
          selectedDateStart={inProps.selectedDateStart}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditTimeForm  = ({ 
  themesOptions, 
  selectedFilial, 
  refetchTimeSlots, 
  setOpen, 
  selectedDateStart, 
  selectRowId, 
  idDay, 
  defaultValues, 
  isEdit }:CreateTimeSlotFormProps) => {
  
  const datetime = dayjs().format("HH:mm");
  
  const initialValues: intialValuesCreateEditTimeForm = {
    day: "",
    nameRage: defaultValues?.timeInterval ?? "" ,
    timeStart: datetime,
    timeEnd: datetime,
    theme: defaultValues?.idTopic ?? "",
    themesOptions: themesOptions ?? []
  };

  const [createTimeSlot, { data: createTimeSlotData }] = useMutation<CreateTimeSlotIn, CreateTimeSlotInput>(CREATE_TIME_SLOT);


  const [createEditTime, { data: editTimeData }] = useMutation<EditTimeIn, EditTimeInput>(EDIT_TIME);

  const onSubmit = (values: ValuesCreateEditTimeForm) => {
    console.log("values: ", values);
    if(isEdit) {
      createEditTime({
        variables: {
          idDay: idDay ?? "",
          idSlot: selectRowId ?? "",
          slotName: values.nameRage,
          timeStart:  values.timeStart,
          timeEnd:  values.timeEnd,
          idTopic: values.theme, 
        }
      })
    } else {
    createTimeSlot({
      variables: { 
        slotName: values.nameRage, 
        timeStart: values.timeStart, 
        timeEnd: values.timeEnd, 
        idTopic: values.theme,
        date: moment(values.day, 'YYYY-MM-DD').format('YYYY-MM-DD') ?? "",
        idDept: selectedFilial 
      }
    })
    }
  };

  useEffect(() => {
    if (createTimeSlotData) {
      refetchTimeSlots();
      setOpen(false);
    }
  }, [createTimeSlotData])

  useEffect(() => {
    if (editTimeData) {
      refetchTimeSlots();
      setOpen(false);
    }
  }, [editTimeData]);

  return (
    <Box margin="auto" sx={{ width: '100%', overflow: 'scroll', maxHeight: '620px' }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          {!isEdit && (
          <>
            <StyledTitleSectionForm>
              День
            </StyledTitleSectionForm>
            <StyledWrapperDatePicker>
                <Field
                  name="day"
                  component={InputDatePicker}
                  placeholderText=""
                  fullWidth
                  nameLabel=""
                  typePicker="datePicker"
                  selectedDateStart={selectedDateStart} />
              </StyledWrapperDatePicker>
            </>
          )}

          <StyledTitleSectionForm>
            Наименование интервала
          </StyledTitleSectionForm>

          <Field
            name="nameRage"
            component={Input}
            fullWidth
            nameLabel="Наименование"
          />

          {!isEdit && (
            <>
            <StyledTitleSectionForm>
              Диапазон времени
            </StyledTitleSectionForm>
            <StyledWrapperDatePicker>
                <Field
                  name="timeStart"
                  component={InputDatePicker}
                  placeholderText="c"
                  fullWidth
                  nameLabel=""
                  typePicker="timePicker" />

                <Field
                  name="timeEnd"
                  component={InputDatePicker}
                  placeholderText="по"
                  fullWidth
                  nameLabel=""
                  typePicker="timePicker" />
              </StyledWrapperDatePicker>
            </>
          )}
 
  
          <StyledTitleSectionForm>
            Тема
          </StyledTitleSectionForm>

          <Field
            name="theme"
            component={InputSelectList}
            fullWidth
            nameLabel="Выберите тему"
            listItems={themesOptions}
            defaultItems={defaultValues?.idTopic}
          />

          <Box mt={3}>
            <StyledButtonSubmit 
              variant="contained" 
              fullWidth 
              type="submit"
            >
              {isEdit ? 'Сохранить' : 'Создать'}
            </StyledButtonSubmit>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateEditTimeForm;
