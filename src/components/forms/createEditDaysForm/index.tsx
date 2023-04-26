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
import Box from "@mui/material/Box";
import { settingsID, settingsRange } from "./consts";
import CheckboxList from "../../checkboxList";
import {
  CustomCheckboxListProps,
  CustomSelectProps,
  intialValuesCreateEditDaysForm,
  ValuesCreateEditDaysForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
  StyledWrapperDatePicker,
} from "./createEditDaysForm.styled";
import CustomSelect from "../../customSelect";
import CustomDatePicker from "../../customDatePicker";
import { useMutation } from "@apollo/client";
import { CREATE_DAY } from "../../../api/mutations/createDay/useCreateDay";
import { createDayIn, createDayInput } from "../../../api/mutations/createDay/types";
import { CreateEditDaysFormProps } from './types';
import moment from "moment";
import { editDayIn, editDayInput } from "../../../api/mutations/editDay/types";
import { EDIT_DAY } from "../../../api/mutations/editDay/useEditDay";


const validationSchema = yup.object({
  idDept: yup.string().required("Обязательное поле"),
  date: yup.string().required("Обязательное поле"),
});

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
          nameField="settingsRange"
          defaultSelected={inProps.defaultItems}
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
          isDatePicker
          placeholderText={inProps.placeholderText} 
          handleChange={handleChange}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditDaysForm = ({ filials, setOpenCreateDaysModal, setOpenEditDaysModal, refetcDaysList, selectedDayId, isEditDay, defaultValues }: CreateEditDaysFormProps) => {

  const initialValues: intialValuesCreateEditDaysForm = {
    idDept: defaultValues?.idDept ?? "",
    date: defaultValues?.freeDate ?? "",
    timeOverlayControl: defaultValues?.timeOverlayControl ?? false,
    avail: defaultValues?.avail ?? false
  };

  const [createDay, { data: createDayData }] = useMutation<createDayIn, createDayInput>(CREATE_DAY);

  const [editDay, { data: editDayData }] = useMutation<editDayIn, editDayInput>(EDIT_DAY);

  const onSubmit = (values: ValuesCreateEditDaysForm) => {
    console.log("values: ", values);
    if (!isEditDay) {
      createDay({
        variables: {
          idDept: values.idDept, 
          date: moment(values.date, 'YYYY-MM-DD').format('YYYY-MM-DD') ?? "", 
          timeOverlayControl: !!values.settingsRange?.includes(settingsID.timeOverlayControl), 
          avail: !!values.settingsRange?.includes(settingsID.avail)
        }
      })
    } else {
      editDay({
        variables: {
          idDept: values.idDept,
          idDay: selectedDayId ?? '',
          date: moment(values.date, 'YYYY-MM-DD').format('YYYY-MM-DD') ?? "",
          timeOverlayControl: !!values.settingsRange?.includes(settingsID.timeOverlayControl),
          avail: !!values.settingsRange?.includes(settingsID.avail)
        }
      })
    }
  };

  useEffect(() => {
      if (createDayData?.addDay.answerId && setOpenCreateDaysModal) {
        setOpenCreateDaysModal(false);
        refetcDaysList();
      }
  }, [createDayData]);

  useEffect(() => {
    if (editDayData && setOpenEditDaysModal) {
      refetcDaysList();
      setOpenEditDaysModal(false);
    }
  }, [editDayData])


  return (
    <Box margin="auto" sx={{ width: '100%', overflow: 'scroll', maxHeight: '620px' }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <StyledTitleSectionForm>
            Подразделение
          </StyledTitleSectionForm>

          <Field
            name="idDept"
            component={InputSelectList}
            fullWidth
            nameLabel="Выберите подразделение"
            listItems={filials}
            defaultItems={defaultValues?.idDept}
          />

          <StyledTitleSectionForm>
            Диапазон для создания дней
          </StyledTitleSectionForm>

          <StyledWrapperDatePicker>
            <Field
              name="date"
              component={InputDatePicker}
              placeholderText="С"
              fullWidth
              nameLabel="Дата"
            />
          </StyledWrapperDatePicker>
  
          <StyledTitleSectionForm>
            Настройка подразделения
          </StyledTitleSectionForm>

          <Field
            name="settingsRange"
            component={InputCheckbox}
            fullWidth
            listItems={settingsRange}
            defaultItems={defaultValues}
          />

          {createDayData?.addDay.answerId === null && (
            <StyledError>День с такой датой уже создан в данном подразделении</StyledError>
          )}

          <Box mt={3}>
            <StyledButtonSubmit 
              variant="contained" 
              fullWidth 
              type="submit"
            >
              {isEditDay ? 'Сохранить' : 'Создать'}
            </StyledButtonSubmit>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateEditDaysForm;
