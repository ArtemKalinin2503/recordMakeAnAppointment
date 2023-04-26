import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton, LinearProgress } from "material-ui-core";
import IconAdd from "../../icons/IconAdd";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import CustomModal from "../../components/modals/customModal/customModal";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import CreateEditTimeForm from "../../components/forms/createEditTimeForm";
import TimesFilters from "../../components/filters/timesFilters";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { UserInfoInput, UserInfoInt } from "../../api/query/users/types";
import { GET_USER_INFO } from "../../api/query/users/useUserInfo";
import {
  GET_FILIALS,
  GET_THEMES,
} from "../../api/query/organizations/useOrganizations";
import {
  FilialsInput,
  FilialsInt,
  ThemeInt,
  ThemesInput,
} from "../../api/query/organizations/types";
import { useFilialsMapper } from "../../mappers/filials.mapper";
import { useOrganizationsUserMapper } from "../../mappers/organizations.mapper";
import { FilialsMapper, OrganizationsMapper } from "../../mappers/types";
import CustomTable from "../../components/customTable";
import { TableHeaderCells } from "./conts";
import {
  GET_TIME_REDACTION,
  GET_TIME_SLOTS_LIST,
} from "../../api/query/timeSlots/useTimeSlots";
import {
  GetTimesSlotsIn,
  GetTimesSlotsInput,
  TimeRedactionIn,
  TimeRedactionInput,
} from "../../api/query/timeSlots/types";
import moment from "moment";
import { useTimesSlotsListMapper } from "../../mappers/timesSlotsList.mapper";
import { useThemesMapper } from "../../mappers/themes.mapper";
import { DELETE_TIME } from "../../api/mutations/deleteTime/useDeleteTime";
import {
  DeleteTimeIn,
  DeleteTimeInput,
} from "../../api/mutations/deleteTime/types";
import MoreDetailedMakeAppointment from "../../components/modals/moreDetailedMakeAppointment";
import Box from "@mui/material/Box";
import {
  getDataToReductionAppointmentIn,
  getDataToReductionAppointmentInput,
} from "../../api/query/makeAppointment/types";
import { FOR_REDUCTION_DATA_APPOINTMENT } from "../../api/query/makeAppointment/useMakeAppointment";
import {
  StyledHeaderSection,
  StyledSectionButtons,
  StyledTextNotResult,
} from "./time.styled";
import { useGetUser } from "../../hooks/useGetUser";

const TimePage: React.FC = () => {
  const { date: selectedDayDate, idDay } = useParams();

  const [openCreateTimeModal, setOpenCreateTimeModal] = useState(false);
  const [openEditTimeModal, setOpenEditTimeModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedFilial, setSelectedFilial] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [selectRowId, setSelectRowId] = useState<string>();
  const [openMakeAppointmentModal, setOpenMakeAppointmentModal] =
    useState(false);
  const [isDesc, setIsDesc] = useState(false);

  const [user] = useGetUser();

  useEffect(() => {
    if (selectedDayDate) {
      setSelectedDateStart(selectedDayDate);
    }
  }, [selectedDayDate]);

  const { data: userInfoData } = useQuery<UserInfoInt, UserInfoInput>(
    GET_USER_INFO,
    {
      variables: {
        userId: user ?? "", // В дальнейшем нужно получать id пользователя
      },
    }
  );

  const [selectOrganization, setSelectOrganization] = useState<string>();

  const [getFilials, { data: filialsData }] = useLazyQuery<
    FilialsInt,
    FilialsInput
  >(GET_FILIALS);

  const filialsOptions: FilialsMapper[] = useFilialsMapper(
    filialsData?.getDepts ?? []
  );

  const organizationsOptions: OrganizationsMapper[] =
    useOrganizationsUserMapper(userInfoData?.getUserInfo ?? []);

  const [
    getTimesSlotsList,
    { data: timesSlotsData, refetch: refetchTimeSlots },
  ] = useLazyQuery<GetTimesSlotsIn, GetTimesSlotsInput>(GET_TIME_SLOTS_LIST);

  const [getThemas, { data: themesData }] = useLazyQuery<ThemeInt, ThemesInput>(
    GET_THEMES
  );

  const [
    getDataToReductionAppointment,
    {
      data: getDataToReductionAppointmentData,
      loading: loadingToReductionAppointment,
    },
  ] = useLazyQuery<
    getDataToReductionAppointmentIn,
    getDataToReductionAppointmentInput
  >(FOR_REDUCTION_DATA_APPOINTMENT);

  useEffect(() => {
    if (selectOrganization) {
      getThemas({
        variables: {
          idOrg: selectOrganization ?? "",
          idDept: selectedFilial ?? "",
        },
      });
    }
  }, [selectOrganization]);

  const themesOptions = useThemesMapper(themesData?.getTopics ?? []);

  useEffect(() => {
    if (selectedFilial && selectedDateStart) {
      getTimesSlotsList({
        fetchPolicy: "network-only",
        variables: {
          idDept: selectedFilial,
          date: selectedDateStart,
          page: pageCount,
          numberEntriesPage: 8,
          columnName: "",
          typeSorting: "",
        },
      });
    }
  }, [selectedFilial, selectedDateStart, pageCount]);

  const [getTimeRedaction, { data: timeRedactionData }] = useLazyQuery<
    TimeRedactionIn,
    TimeRedactionInput
  >(GET_TIME_REDACTION);

  const [deleteTime, { data: deleteTimeData }] = useMutation<
    DeleteTimeIn,
    DeleteTimeInput
  >(DELETE_TIME);

  useEffect(() => {
    setSelectOrganization(userInfoData?.getUserInfo[0].organizationId);
  }, [userInfoData]);

  useEffect(() => {
    if (selectOrganization) {
      getFilials({
        variables: {
          idOrg: selectOrganization ?? "",
        },
      });
    }
  }, [getFilials, selectOrganization, userInfoData, pageCount]);

  useEffect(() => {
    setSelectedFilial(filialsData?.getDepts[0].IdDept ?? "");
  }, [filialsData]);

  useEffect(() => {
    if (deleteTimeData) {
      setOpenApproveDeleteModal(false);
      refetchTimeSlots();
    }
  }, [deleteTimeData]);

  const handleEditTime = () => {
    setOpenEditTimeModal(true);
    getTimeRedaction({
      variables: {
        idDept: selectedFilial,
        idSlot: selectRowId ?? "",
        date:
          moment(selectedDateStart, "DD.MM.YYYY").format("YYYY-MM-DD") ?? "",
      },
    });
  };

  const handleDelete = () => {
    deleteTime({
      variables: {
        idSlot: selectRowId ?? "",
      },
    });
  };

  const handleLinkMakeAppointment = (id: string) => {
    setOpenMakeAppointmentModal(true);
    getDataToReductionAppointment({
      variables: {
        makeAppointmentId: id,
        organizationId: selectOrganization ?? "",
      },
    });
  };

  const timesSlots = useTimesSlotsListMapper(
    timesSlotsData?.getSlotsList ?? [],
    handleLinkMakeAppointment
  );

  // Сортировка (value - направление сортировки, name - название / id колонки (id колонки сделал как сказал бекенд)
  const handleSort = (value: boolean, name: string) => {
    getTimesSlotsList({
      fetchPolicy: "network-only",
      variables: {
        idDept: selectedFilial,
        date: selectedDateStart,
        page: pageCount,
        numberEntriesPage: 8,
        columnName: name,
        typeSorting: value ? "asc" : "desc",
      },
    });
  };

  return (
    <>
      <StyledHeaderSection>
        <TimesFilters
          organizations={organizationsOptions ?? []}
          selectOrganization={selectOrganization ?? ""}
          setSelectOrganization={setSelectOrganization}
          filials={filialsOptions ?? []}
          selectedFilial={selectedFilial}
          setSelectedFilial={setSelectedFilial}
          setSelectedDateStart={setSelectedDateStart}
          selectedDateStart={selectedDateStart ?? ""}
        />

        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateTimeModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton onClick={handleEditTime}>
            <IconEdit />
          </IconButton>
          <IconButton onClick={() => setOpenApproveDeleteModal(true)}>
            <IconDelete />
          </IconButton>
        </StyledSectionButtons>
      </StyledHeaderSection>

      <CustomModal
        title="Создание диапазона времени"
        children={
          <CreateEditTimeForm
            themesOptions={themesOptions ?? []}
            selectedFilial={selectedFilial ?? ""}
            refetchTimeSlots={refetchTimeSlots}
            setOpen={setOpenCreateTimeModal}
          />
        }
        open={openCreateTimeModal}
        setOpen={setOpenCreateTimeModal}
      />

      {timeRedactionData?.getDataToReductionSlot && (
        <CustomModal
          title="Редактирование диапазона времени"
          children={
            <CreateEditTimeForm
              themesOptions={themesOptions ?? []}
              selectedFilial={selectedFilial ?? ""}
              refetchTimeSlots={refetchTimeSlots}
              setOpen={setOpenEditTimeModal}
              selectedDateStart={selectedDateStart}
              selectRowId={selectRowId}
              idDay={idDay}
              defaultValues={timeRedactionData?.getDataToReductionSlot}
              isEdit
            />
          }
          open={openEditTimeModal}
          setOpen={setOpenEditTimeModal}
        />
      )}

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Диапазон успешно создан"
            setOpen={setOpenSuccessModal}
          />
        }
      />

      <CustomModal
        title=""
        open={openApproveDeleteModal}
        setOpen={setOpenApproveDeleteModal}
        children={
          <ApproveDelete
            title="Вы точно хотите удалить диапазон ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title=""
        open={openMakeAppointmentModal}
        setOpen={setOpenMakeAppointmentModal}
        children={
          getDataToReductionAppointmentData?.getDataToReductionAppointment ? (
            <MoreDetailedMakeAppointment
              title="Подробнее о записи на прием"
              listItems={
                getDataToReductionAppointmentData?.getDataToReductionAppointment
              }
            />
          ) : (
            <Box sx={{ width: "100%", minWidth: 400 }}>
              <LinearProgress />
            </Box>
          )
        }
      />

      {timesSlots?.length ? (
        <CustomTable
          tableHeaderCells={TableHeaderCells}
          tableCells={timesSlots}
          setSelectRowId={setSelectRowId}
          pageCount={pageCount}
          setPageCount={setPageCount}
          handleSort={(value, name) => handleSort(value, name)}
          isDesc={isDesc}
          setIsDesc={setIsDesc}
        />
      ) : (
        <StyledTextNotResult>Записи отсутствуют</StyledTextNotResult>
      )}
    </>
  );
};

export default TimePage;
