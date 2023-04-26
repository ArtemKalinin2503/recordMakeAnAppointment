import React, { FC, useEffect, useState } from "react";
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
import CheckboxList from "../../checkboxList";

import CustomSelect from "../../customSelect";
import { settingsID, settingsTheme } from "./consts";
import {
  CreateEditThemeFormProps,
  CustomCheckboxListProps,
  CustomInputProps,
  CustomSelectProps,
  intialValuesCreateEdiThemeForm,
  ISettingsThemas,
  ValuesCreateEditThemeForm,
} from "./types";
import {
  StyledButtonSubmit,
  StyledError,
  StyledTextFieldWrapper,
  StyledTitleSectionForm,
} from "./createEditTheme.styled";
import { useUserInfotMapper } from "../../../mappers/userInfo.mapper";
import { useMutation } from "@apollo/client";
import { ADD_TOPIC } from "../../../api/mutations/addTopic/useAddTopic";
import { AddTopicInput, AddTopicInt } from "../../../api/mutations/addTopic/types";
import CustomSelectGroup from "../../customSelectGroup";
import { EDIT_TOPIC } from "../../../api/mutations/editThema/useEditThema";
import { EditThemaIn, EditThemaInput } from "../../../api/mutations/editThema/types";

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обязательное поле"),
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

  const listItemsSettingsThemas: ISettingsThemas[] = inProps.listItems.filter((item: ISettingsThemas) => !item.disabled) ?? []

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: '100%' }}>
        <CheckboxList 
          listItems={listItemsSettingsThemas}
          nameField="settingsTheme"
          defaultSelected={inProps.defaultItems}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле select
const InputSelectList: FC<CustomSelectProps & FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name, field.value);
  const inProps = props;

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: "100%" }}>
        <CustomSelect
          label={inProps.nameLabel}
          listItems={inProps.listItems}
          name={field.name}
          isError={!!touch && errorMessage}
          value={field.value}
          // @ts-ignore
          onChange={(event) => inProps.onChange(event)}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле с selectGroup
const InputSelectGroup: FC<CustomSelectProps & FieldProps> = ({
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
        <CustomSelectGroup 
          listItems={inProps.listItems}
          label={inProps.nameLabel}
          name={field.name}
          isEditThema={inProps.isEditThema}
          defaultSelected={inProps.defaultFilials}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const CreateEditThemeForm = ({ 
  organizations, 
  selectOrganizationId, 
  filials, 
  refetchGetThemasList, 
  isEditThema, 
  selectRowId,  
  themasListData,
  setOpenCreateThemeModal,
  setOpenEditThemeModal
}: CreateEditThemeFormProps) => {

  const organizationsOptions = useUserInfotMapper(organizations ?? []);

  const [addTheme, { data: addThemesData }] = useMutation<AddTopicInt, AddTopicInput>(ADD_TOPIC);

  const [editTheme, { data: editThemaData }] = useMutation<EditThemaIn, EditThemaInput>(EDIT_TOPIC);

  const [selectOrganization, setSelectOrganization] = useState(selectOrganizationId);

  const initialValues: intialValuesCreateEdiThemeForm = {
    organization: themasListData?.getDataToReductionTopic.idOrg ?? "",
    name: themasListData?.getDataToReductionTopic.topicName ?? "",
    description: themasListData?.getDataToReductionTopic.descName ?? "",
    settingsTheme: [],
    filials: themasListData?.getDataToReductionTopic.idDeptsOthers ?? []
  };

  useEffect(() => {
    if (addThemesData && refetchGetThemasList && setOpenCreateThemeModal) {
      refetchGetThemasList();
      setOpenCreateThemeModal(false);
    }
    if (editThemaData && refetchGetThemasList && setOpenEditThemeModal) {
      refetchGetThemasList();
      setOpenEditThemeModal(false);
    }
  }, [addThemesData, editThemaData]);

  const onSubmit = (values: ValuesCreateEditThemeForm) => {
    console.log("values: ", values);
    if (!isEditThema) {
      addTheme({
        variables: {
          idOrg: selectOrganization ?? '', 
          topicName: values.name, 
          descName: values.description,
          listIdDepts: values.filials,
          avail: !!values.settingsTheme.includes(settingsID.avail),
          selfService: !!values.settingsTheme.includes(settingsID.selfService),
          spec: !!values.settingsTheme.includes(settingsID.spec)
        }
      });
    } else {
      editTheme({
        variables: {
          idTopic: selectRowId ?? '', 
          idOrg: selectOrganization ?? '', 
          topicName: values.name,  
          descName: values.description,
          avail: !!values.settingsTheme.includes(settingsID.avail),
          selfService: !!values.settingsTheme.includes(settingsID.selfService), 
          spec: !!values.settingsTheme.includes(settingsID.spec),
          listIdDepts: values.filials,
        }
      })
    }
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
            value={selectOrganization}
            listItems={organizationsOptions}
            onChange={(event: any) => setSelectOrganization(event)}
          />

          <Field
            name="filials"
            component={InputSelectGroup}
            fullWidth
            nameLabel="Подразделения"
            value={selectOrganization}
            listItems={filials}
            defaultFilials={themasListData?.getDataToReductionTopic.idDeptsSelected}
            isEditThema={isEditThema}
          />

          <StyledTitleSectionForm>
            Основная информация
          </StyledTitleSectionForm>

          <Field
            name="name"
            component={Input}
            fullWidth
            nameLabel="Наименование"
          />

          <Field
            name="description"
            component={Input}
            fullWidth
            nameLabel="Описание"
          />
  
          <StyledTitleSectionForm>
            Настройка темы
          </StyledTitleSectionForm>

          <Field
            name="settingsTheme"
            component={InputCheckbox}
            fullWidth
            listItems={settingsTheme}
            defaultItems={themasListData?.getDataToReductionTopic}
          />

          <Box mt={3}>
            <StyledButtonSubmit 
              variant="contained" 
              fullWidth 
              type="submit"
            >
              {isEditThema ? 'Сохранить' : "Создать"}
            </StyledButtonSubmit>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateEditThemeForm;
