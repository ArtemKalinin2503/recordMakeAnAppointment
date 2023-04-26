import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { MuiTextFieldProps } from "@mui/x-date-pickers/internals/components/PureDateInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "material-ui-core";
import moment from "moment";
import { CustomDatePickerStaticProps } from "./types";
import { StyledDatePickerWrapper } from "./customDatePickerStatic.styled";
import { useFormikContext } from "formik";

const CustomDataPickerStatic = ({
  label = "DatePicker",
  onChange,
  minDate,
  name,
  availableDays,
  busyDays
}: CustomDatePickerStaticProps) => {
  const [datePickerValue, setDatePickerValue] = useState<any>(
    dayjs(new Date())
  );

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const onlyDate = moment(datePickerValue?.$d).format("YYYY-MM-DD");
    onChange(onlyDate);
    setFieldValue(name, onlyDate);
  }, [datePickerValue]);

  const renderInput = (params: MuiTextFieldProps): JSX.Element => {
    return (
      <TextField
        {...(params as Record<string, unknown>)}
        label={label}
        autoComplete="off"
      />
    );
  };

  // Функция которая возвращает доступные дни для записи на прием
  // Сам каледарь почему-то делает disabled дни плюс один день от дней в массиве которые приходят с бекенда
  // То есть календарь каждый день из массива увеличивает на один день и получается не верно (поэтому и отнимаю один день)
  const availableRecordingDates = (dateParam: Date) => {
    let dates = availableDays ?? busyDays; // Это массив доступных дат записи на прием / или занятых дней
    const currentDate = dateParam.toISOString().split("T")[0];
    let disabledDate = false;
    dates?.map((day: string) => {
      const date = new Date(day);
      const dateMinusOneDay = date.getDate() - 1;
      const getFormatDate = `${dateMinusOneDay}.${moment(day).format("MM")}.${moment(day).format('YYYY')}`;
      const currenDD = moment(currentDate).format("DD.MM.YYYY");
      if (getFormatDate === currenDD) {
        disabledDate = true;
      }
    });
    return availableDays?.length ? !disabledDate : disabledDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
      <StyledDatePickerWrapper>
        <StaticDatePicker
          showToolbar={false}
          onChange={(newValue) => setDatePickerValue(newValue)}
          renderInput={renderInput}
          value={datePickerValue}
          minDate={minDate}
          shouldDisableDate={(dateParam) => availableRecordingDates(dateParam)}
        />
      </StyledDatePickerWrapper>
    </LocalizationProvider>
  );
};

export default CustomDataPickerStatic;