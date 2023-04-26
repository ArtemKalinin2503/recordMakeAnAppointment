import React, { FC, useState, useEffect } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import ReCAPTCHA from "react-google-recaptcha";
import {
  getIn,
  Field,
  Form,
  Formik,
  FieldProps,
  useFormikContext,
} from "formik";
import * as yup from "yup";
import { TextField } from "material-ui-core";
import { useUserInfotMapper } from "../../../mappers/userInfo.mapper";
import { useFilialsMapper } from "../../../mappers/filials.mapper";
import {
  GET_FILIALS,
  GET_THEMES,
  GET_TIME_SLOTES,
} from "../../../api/query/organizations/useOrganizations";
import {
  FilialsInput,
  FilialsInt,
  ThemeInt,
  ThemesInput,
  TimeSlotInput,
  TimeSlotsIn,
} from "../../../api/query/organizations/types";
import { useThemesMapper } from "../../../mappers/themes.mapper";
import { useTimeSlotsMapper } from "../../../mappers/timeSlots.mapper";
import { CREATE_MAKE_APPOINTMENT } from "../../../api/mutations/createMakeAppointment/useCreateMakeAppointment";
import Box from "@mui/material/Box";
import { KEY_CAPTCHA, notifications } from "./consts";
import CheckboxList from "../../checkboxList";
import CustomSelect from "../../customSelect";
import CustomRecordingTime from "../../customRecordingTime";
import { TimeZoneMapper } from "../../customRecordingTime/types";
import CustomDataPickerStatic from "../../customDataPickerStatic";
import {
  BLOCK_TIME_INTERVAL,
  GET_AVAILABLE_DAYS,
} from "../../../api/query/makeAppointment/useMakeAppointment";
import {
  availableDay,
  availableDaysIn,
  availableDaysInput,
  blockTimeIntervalIn,
  blockTimeIntervalInput,
} from "../../../api/query/makeAppointment/types";
import {
  CustomCheckboxListProps,
  CustomInputProps,
  CustomSelectProps,
  intialValuesCreateEditMakeAppointmentForm,
  ValuesCreateEditMakeAppointmentForm,
} from "./types";
import {
  StyledButtonNext,
  StyledButtonSubmit,
  StyledCaptchaWrapper,
  StyledError,
  StyledTextFieldWrapper,
  StyledTimeZonesInfo,
  StyledTitleSectionForm,
} from "./makeAppointmentOutsideForm.styled";
import {
  createMakeAppointmentInput,
  createMakeAppointmentInt,
} from "../../../api/mutations/createMakeAppointment/types";
import { GET_USER_INFO } from "../../../api/query/users/useUserInfo";
import { UserInfoInput, UserInfoInt } from "../../../api/query/users/types";
import CustomModal from "../../modals/customModal/customModal";
import InformationAboutRecord from "../../informationAboutRecord";

// Текстовое поле
const Input: FC<CustomInputProps & FieldProps> = ({
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
const InputCheckbox: FC<CustomCheckboxListProps & FieldProps> = ({
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
        <CheckboxList listItems={inProps.listItems} nameField="notifications" />
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
  const touch = getIn(form.touched, field.name);
  const inProps = props;

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: "100%" }}>
        <CustomSelect
          label={inProps.nameLabel}
          listItems={inProps.listItems}
          name={field.name}
          isError={!!touch && errorMessage}
          // @ts-ignore
          onChange={(event) => inProps.onChange(event)}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

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
          availableDays={inProps.availableDays ?? []}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

// Поле с выбором времени
const InputTimeSelected: FC<CustomSelectProps & FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorMessage = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const inProps = props;

  const { setFieldValue } = useFormikContext();

  const handleSelectedTime = (value: TimeZoneMapper) => {
    setFieldValue(field.name, value.id);
    inProps.setSelectTimeId(value.idTimeInterval);
  };

  return (
    <StyledTextFieldWrapper>
      <Box sx={{ width: "100%" }}>
        <CustomRecordingTime
          listTimes={inProps.listItems}
          handleSelectedTime={handleSelectedTime}
        />
        {errorMessage && touch && <StyledError>{errorMessage}</StyledError>}
      </Box>
    </StyledTextFieldWrapper>
  );
};

const MakeAppointmentOutsideForm = () => {
  const validationSchema = yup.object({
    organization: yup.string().required("Обязательное поле"),
    division: yup.string().required("Обязательное поле"),
    themesRecording: yup.string().required("Обязательное поле"),
    lastname: yup.string().required("Обязательное поле"),
    name: yup.string().required("Обязательное поле"),
    fullName: yup.string().required("Обязательное поле"),
    phone: yup.string().required("Обязательное поле"),
    email: yup.string(),
  });

  const initialValues: intialValuesCreateEditMakeAppointmentForm = {
    organization: "",
    division: "",
    themesRecording: "",
    lastname: "",
    name: "",
    fullName: "",
    phone: "",
    email: "",
    accountNumber: "",
    comments: "",
    receptionDay: "",
    notifications: [],
    receptionTime: [],
  };

  const [selectOrganization, setSelectOrganization] = useState();
  const [selectFilial, setSelectFilial] = useState();
  const [selectThema, setSelectThema] = useState();
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectTimeId, setSelectTimeId] = useState();
  const [stepNext, setStepNext] = useState(false);
  const [captchaValue, setCaptchaValue] = useState();
  const [openConfirmationNewRecordModal, setOpenConfirmationNewRecordModal] = useState(false);

  const { data: userInfoData } = useQuery<UserInfoInt, UserInfoInput>(
    GET_USER_INFO,
    {
      variables: {
        userId: "586bf298-96ba-492d-bd9a-f37e14efa757", // В дальнейшем нужно получать id пользователя
      },
    }
  );

  const userOrganizationId = userInfoData?.getUserInfo[0].organizationId;

  const [getFilials, { data: filialsData }] = useLazyQuery<
    FilialsInt,
    FilialsInput
  >(GET_FILIALS);

  const [getThemas, { data: themesData }] = useLazyQuery<ThemeInt, ThemesInput>(
    GET_THEMES
  );

  const [getAvailableDays, { data: availableDaysData }] = useLazyQuery<
    availableDaysIn,
    availableDaysInput
  >(GET_AVAILABLE_DAYS);

  const idSelectedDay = availableDaysData?.getAvailableDays?.filter(
    (item) => item.freeDate === String(selectDate)
  )[0]?.idDay;

  const [getTimeSlots, { data: timeSlotsData }] = useLazyQuery<
    TimeSlotsIn,
    TimeSlotInput
  >(GET_TIME_SLOTES);

  console.log("timeSlotsData: ", timeSlotsData);

  const [blockTimeInterval, { data: blockTimeIntervalData }] = useLazyQuery<
    blockTimeIntervalIn,
    blockTimeIntervalInput
  >(BLOCK_TIME_INTERVAL);

  // Mutations
  const [addNewMakeAppointment, { data: newMakeAppointmetnData }] = useMutation<
    createMakeAppointmentInt,
    createMakeAppointmentInput
  >(CREATE_MAKE_APPOINTMENT);

  // Mappers
  const organizationsOptions = useUserInfotMapper(
    userInfoData?.getUserInfo ?? []
  );
  const filialsOptions = useFilialsMapper(filialsData?.getDepts ?? []);
  const timeSlotsOptions = useTimeSlotsMapper(
    timeSlotsData?.getTimeSlots ?? []
  );
  const themesOptions = useThemesMapper(themesData?.getTopics ?? []);

  useEffect(() => {
    if (selectOrganization) {
      getThemas({
        variables: {
          idOrg: selectOrganization ?? "",
          idDept: selectFilial ?? "",
        },
      });
    }
  }, [selectOrganization]);

  useEffect(() => {
    if (userInfoData && selectOrganization) {
      getFilials({
        variables: {
          idOrg: selectOrganization ?? "",
        },
      });
    }
  }, [userInfoData, selectOrganization]);

  useEffect(() => {
    if (selectThema && selectDate) {
      getTimeSlots({
        fetchPolicy: "network-only",
        variables: {
          idDay: idSelectedDay ?? "",
          idTopic: selectThema ?? "",
        },
      });
    }
  }, [selectThema, selectDate]);

  useEffect(() => {
    if (selectFilial && selectThema) {
      getAvailableDays({
        variables: {
          idDept: selectFilial,
          idTopic: selectThema,
        },
      });
    }
  }, [selectFilial, selectThema]);

  useEffect(() => {
    if (selectTimeId) {
      blockTimeInterval({
        variables: {
          idUser: "586bf298-96ba-492d-bd9a-f37e14efa757" ?? "", // iduser потом изменить на реальный
          idTimeInterval: selectTimeId ?? "",
        },
      });
    }
  }, [selectTimeId]);

  useEffect(() => {
    if (newMakeAppointmetnData?.makingAppointment) {
      setOpenConfirmationNewRecordModal(true);
    }
  }, [newMakeAppointmetnData]);

  // Массив доступных дат для записи на прием
  const availableDays = availableDaysData?.getAvailableDays?.map(
    (organization: availableDay) => organization.freeDate
  );

  const onSubmit = (values: ValuesCreateEditMakeAppointmentForm) => {
    console.log("values: ", values);
    addNewMakeAppointment({
      variables: {
        usId: "586bf298-96ba-492d-bd9a-f37e14efa757",
        organizationId: selectOrganization ?? "",
        firstName: values.name,
        midlName: values.fullName,
        lastName: values.lastname,
        idSlot: selectTimeId ?? "",
        nameUser: values.name,
        phoneUser: values.phone,
        emailUser: values.email,
        personalAccount: values.accountNumber,
        notificationMail: true,
        idTopic: selectThema ?? "",
        ClientExternalSystem: null,
        AppealExternalSystem: null,
        idDept: selectFilial ?? "",
        comment: values.comments,
      },
    });
  };

  console.log('newMakeAppointmetnData: ', newMakeAppointmetnData?.makingAppointment);
  
  return (
    <Box margin="auto" sx={{ maxWidth: "860px" }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <>
            <StyledTitleSectionForm>Организация</StyledTitleSectionForm>

            <Field
              name="organization"
              component={InputSelectList}
              fullWidth
              nameLabel="Организация"
              value={selectOrganization}
              listItems={organizationsOptions}
              onChange={(event: any) => setSelectOrganization(event)}
            />

            <StyledTitleSectionForm>Подразделение</StyledTitleSectionForm>

            <Field
              name="division"
              component={InputSelectList}
              fullWidth
              nameLabel="Подразделение"
              listItems={filialsOptions}
              onChange={(event: any) => setSelectFilial(event)}
            />

            <StyledTitleSectionForm>Тема обращения</StyledTitleSectionForm>

            <Field
              name="themesRecording"
              component={InputSelectList}
              fullWidth
              nameLabel="Тема"
              value={selectThema}
              listItems={themesOptions}
              onChange={(event: any) => setSelectThema(event)}
            />

            {stepNext && (
              <>
                <StyledTitleSectionForm>Дата приема</StyledTitleSectionForm>

                <Field
                  name="receptionDay"
                  component={InputDatePickerStatic}
                  placeholderText=""
                  fullWidth
                  nameLabel=""
                  onChange={(event: any) => setSelectDate(event)}
                  availableDays={availableDays}
                />

                <StyledTitleSectionForm>Время приема</StyledTitleSectionForm>

                {timeSlotsOptions?.length ? (
                  <Field
                    name="receptionTime"
                    component={InputTimeSelected}
                    fullWidth
                    nameLabel=""
                    listItems={timeSlotsOptions}
                    setSelectTimeId={setSelectTimeId}
                  />
                ) : (
                  <StyledTimeZonesInfo>
                    Для выбора времени, выберите тему обращения и дату
                  </StyledTimeZonesInfo>
                )}
                <StyledTitleSectionForm>Личные данные</StyledTitleSectionForm>
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
                  nameLabel="Номер телефона"
                />
                <Field
                  name="email"
                  component={Input}
                  fullWidth
                  nameLabel="E-mail"
                />
                <Field
                  name="accountNumber"
                  component={Input}
                  fullWidth
                  nameLabel="Номер лицевого счета"
                />
                <Field
                  name="comments"
                  component={Input}
                  fullWidth
                  nameLabel="Комментарии"
                />
                <Field
                  name="notifications"
                  component={InputCheckbox}
                  fullWidth
                  listItems={notifications}
                />

                <StyledCaptchaWrapper>
                  <ReCAPTCHA
                    sitekey={KEY_CAPTCHA}
                    onChange={(value: any) => setCaptchaValue(value)}
                  />
                </StyledCaptchaWrapper>
      
                <Box mt={3}>
                  <StyledButtonSubmit
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Создать
                  </StyledButtonSubmit>
                </Box>
              </>
            )}
            <StyledButtonNext 
              onClick={() => setStepNext(!stepNext)}
              variant="outlined" 
            >
                {stepNext ? "Назад" : "Дальше"}
            </StyledButtonNext>
          </>
        </Form>
      </Formik>

      <CustomModal
        title="Создание новой записи на прием"
        open={openConfirmationNewRecordModal}
        setOpen={setOpenConfirmationNewRecordModal}
        children={
          <InformationAboutRecord
            dataRecord={newMakeAppointmetnData?.makingAppointment ?? []}
            setOpen={setOpenConfirmationNewRecordModal}
            isOutSideRecord
          />
        }
      />
    </Box>
  );
};

export default MakeAppointmentOutsideForm;
