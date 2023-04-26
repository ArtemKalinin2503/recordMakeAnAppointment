import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledDatePickerInput } from "./customDatePicker.styled";
import { CustomDatePickerProps } from "./types";
import moment from "moment";

const CustomDatePicker = ({
  isDatePicker,
  isTimePicker,
  handleChange,
  placeholderText,
  selectedDateStart,
}: CustomDatePickerProps) => {

  const formatDate = moment(selectedDateStart, 'DD.MM.YYYY' ).format('YYYY-MM-DD');

  const [datePickerValue, setDatePickerValue] = useState<any>(selectedDateStart ? formatDate : new Date());

  const [timePickerValue, setTimePickerValue] = useState<any>(dayjs());

  const handleChangePicker = (value: any) => {
    const onlyDate =  moment(value?.$d ).format('YYYY-MM-DD')
    const onlyTime = moment(value?.$d).format('HH:mm')
    setDatePickerValue(value)
    setTimePickerValue(value)
    handleChange(isDatePicker ? onlyDate : onlyTime)
  }
  useEffect(() => {
    if (isDatePicker) {
      const value = moment(datePickerValue, 'DD.MM.YYYY').format('YYYY-MM-DD');
      handleChange(value);
    }
    if (isTimePicker) {
      setTimePickerValue(moment(timePickerValue.$d).format('HH:mm'))
    }
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
      <Stack spacing={3}>
        {isDatePicker && (
          <DatePicker
            value={datePickerValue}
            inputFormat={`${placeholderText} DD.MM.YYYY`}
            onChange={(newValue) => handleChangePicker(newValue)}
            renderInput={(params) => <StyledDatePickerInput {...params} />}
          />
        )}
        {isTimePicker && (
          <TimePicker
            value={timePickerValue}
            inputFormat={`${placeholderText} ${moment(timePickerValue?.$d).format('HH:mm')}`}
            onChange={(newValue) => handleChangePicker(newValue)}
            renderInput={(params) => <StyledDatePickerInput {...params} />}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default React.memo(CustomDatePicker);
