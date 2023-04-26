import React, { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomRecordingTimeProps, TimeZoneMapper } from "./types";
import {
  StyledButtonChangeView,
  StyledInfoTimeSlots,
  StyledItemsTimeWrapper,
  StyledItemTime,
  StyledItemWrapper,
  StyledWrapper,
} from "./customRecordingTime.styled";

const CustomRecordingTime = ({
  listTimes,
  handleSelectedTime,
}: CustomRecordingTimeProps) => {
  
  const [viewTypeIsTable, setViewTypeIsTable] = useState(true);

  const changeView = () => {
    setViewTypeIsTable(!viewTypeIsTable);
  };

  const timeZones = listTimes?.map((item: any) => item.timeZones[0]);

  const [listItemsState, setListItemsState] = useState(timeZones);

  const handleClickTime = (zone: TimeZoneMapper, index: number) => {
    handleSelectedTime(zone)
    const data = listItemsState;
    data?.map((item: TimeZoneMapper) => {
      item.isChecked = false
    });
    data[index].isChecked = !data[index].isChecked;
    setListItemsState([...data]);
  };

  return (
    <StyledWrapper>
      <StyledButtonChangeView onClick={changeView}>
        {viewTypeIsTable && (
          <>
            <ListIcon style={{ marginRight: 10 }} />
            Отобразить списком
          </>
        )}
        {!viewTypeIsTable && (
          <>
            <MenuIcon style={{ marginRight: 10 }} />
            Отобразить таблицей
          </>
        )}
      </StyledButtonChangeView>

      <StyledItemsTimeWrapper viewTypeIsTable={viewTypeIsTable}>
        {listItemsState?.length ? listItemsState?.map((time: TimeZoneMapper, index: number) => {
          return (
            <>
              {time?.isActive && (
                <StyledItemWrapper
                  isChecked={time.isChecked}
                  disabled={!time.isActive}
                  onClick={() => handleClickTime(time, index)}
                >
                  <StyledItemTime>
                    {time.dateFormat}
                  </StyledItemTime>
                </StyledItemWrapper>
              )}
            </>
          );
        }) : <StyledInfoTimeSlots>Нет свободного времени приема в выбраный день </StyledInfoTimeSlots>}
      </StyledItemsTimeWrapper>
    </StyledWrapper>
  );
};

export default CustomRecordingTime;