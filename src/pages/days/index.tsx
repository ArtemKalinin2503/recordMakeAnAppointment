import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { IconButton } from "material-ui-core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  deleteDayIn,
  deleteDayInput,
} from "../../api/mutations/deleteDay/types";
import { DELETE_DAY } from "../../api/mutations/deleteDay/useDeleteDay";
import {
  Day,
  DayRedactionIn,
  DayRedactionInput,
  DaysIn,
  DaysInput,
} from "../../api/query/days/types";
import { GET_DAYS_LIST, GET_DAY_REDACTION } from "../../api/query/days/useDays";
import { FilialsInput, FilialsInt } from "../../api/query/organizations/types";
import { GET_FILIALS } from "../../api/query/organizations/useOrganizations";
import { UserInfoInput, UserInfoInt } from "../../api/query/users/types";
import { GET_USER_INFO } from "../../api/query/users/useUserInfo";
import ApproveDelete from "../../components/approveDelete";
import BlockSuccess from "../../components/blockSuccess";
import CustomTable from "../../components/customTable";
import DaysFilters from "../../components/filters/daysFilters";
import CreateEditDaysForm from "../../components/forms/createEditDaysForm";
import CustomModal from "../../components/modals/customModal/customModal";
import IconAdd from "../../icons/IconAdd";
import IconCreateTemplate from "../../icons/IconCreateTemplate";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import { useDaysMapper } from "../../mappers/days.mapper";
import { useFilialsMapper } from "../../mappers/filials.mapper";
import { useOrganizationsUserMapper } from "../../mappers/organizations.mapper";
import { FilialsMapper, OrganizationsMapper } from "../../mappers/types";
import { TableHeaderCells } from "./consts";
import {
  StyledSectionButtons,
  StyledHeaderSection,
  StyledTextNotResult,
} from "./days.styled";
import CopyDayForm from "../../components/forms/copyDayForm";
import { CopyDayIn, CopyDayInput } from "../../api/mutations/copyDay/types";
import { COPY_DAY } from "../../api/mutations/copyDay/useCopyDay";
import { ValuesCreateCopyDayForm } from "../../components/forms/copyDayForm/types";
import { useGetUser } from "../../hooks/useGetUser";

const Days: React.FC = () => {
  const navigate = useNavigate();

  const [openCreateDaysModal, setOpenCreateDaysModal] = useState(false);
  const [openEditDaysModal, setOpenEditDaysModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [selectedFilial, setSelectedFilial] = useState("");
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectRowId, setSelectRowId] = useState<string>();
  const [pageCount, setPageCount] = useState(1);
  const [getRowId, setGetRowId] = useState("");
  const [isDesc, setIsDesc] = useState(false);

  const [user] = useGetUser();

  const { data: userInfoData } = useQuery<UserInfoInt, UserInfoInput>(
    GET_USER_INFO,
    {
      variables: {
        userId: user ?? "", // В дальнейшем нужно получать id пользователя
      },
    }
  );

  const [getFilials, { data: filialsData }] = useLazyQuery<
    FilialsInt,
    FilialsInput
  >(GET_FILIALS);

  const [selectOrganization, setSelectOrganization] = useState<string>();

  const filialsOptions: FilialsMapper[] = useFilialsMapper(
    filialsData?.getDepts ?? []
  );

  const organizationsOptions: OrganizationsMapper[] =
    useOrganizationsUserMapper(userInfoData?.getUserInfo ?? []);

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

  const [
    getDaysListData,
    {
      data: daysListInfoData,
      loading: loadingDaysList,
      refetch: refetcDaysList,
    },
  ] = useLazyQuery<DaysIn, DaysInput>(GET_DAYS_LIST, {
    fetchPolicy: "network-only",
    variables: {
      numberEntriesPage: 10,
      page: pageCount,
      idDept: selectedFilial,
      dateStart: selectedDateStart,
      dateEnd: selectedDateEnd,
      columnName: "",
      typeSorting: "",
    },
  });

  const [getDayRedaction, { data: redactionDayData }] = useLazyQuery<
    DayRedactionIn,
    DayRedactionInput
  >(GET_DAY_REDACTION);

  useEffect(() => {
    if (selectedFilial && selectedDateStart && selectedDateEnd) {
      getDaysListData({
        fetchPolicy: "network-only",
        variables: {
          numberEntriesPage: 10,
          page: pageCount,
          idDept: selectedFilial,
          dateStart: selectedDateStart,
          dateEnd: selectedDateEnd,
          columnName: "",
          typeSorting: "",
        },
      });
    }
  }, [selectedFilial, selectedDateStart, selectedDateEnd, pageCount]);

  const daysList = useDaysMapper(daysListInfoData?.getDaysList ?? []);

  const [deleteDay, { data: deleteDayData }] = useMutation<
    deleteDayIn,
    deleteDayInput
  >(DELETE_DAY);

  const [createCopyDay, { data: createCopyDayData }] = useMutation<
    CopyDayIn,
    CopyDayInput
  >(COPY_DAY);

  const selectedDay: Day | undefined = daysListInfoData?.getDaysList.find(
    (day: Day) => day.idDay === getRowId
  );

  const selectedDayDate = selectedDay?.freeDate;

  const handleDelete = () => {
    deleteDay({
      variables: {
        idDay: selectRowId ?? "",
      },
    });
  };

  const handleEdit = () => {
    setOpenEditDaysModal(true);
    getDayRedaction({
      variables: {
        idDay: selectRowId ?? "",
        idDept: selectedFilial ?? "",
      },
    });
  };

  // Сортировка (value - направление сортировки, name - название / id колонки (id колонки сделал как сказал бекенд)
  const handleSort = (value: boolean, name: string) => {
    getDaysListData({
      fetchPolicy: "network-only",
      variables: {
        numberEntriesPage: 10,
        page: pageCount,
        idDept: selectedFilial,
        dateStart: selectedDateStart,
        dateEnd: selectedDateEnd,
        columnName: name,
        typeSorting: value ? "asc" : "desc",
      },
    });
  };

  useEffect(() => {
    if (deleteDayData) {
      refetcDaysList();
      setOpenApproveDeleteModal(false);
    }
  }, [deleteDayData]);

  useEffect(() => {
    if (createCopyDayData) {
      refetcDaysList();
      setOpenTemplateModal(false);
    }
  }, [createCopyDayData]);

  const handleCreateCopyDay = (value: ValuesCreateCopyDayForm) => {
    createCopyDay({
      variables: {
        idDayFrom: selectRowId ?? "",
        date: value.receptionDay,
      },
    });
  };

  useEffect(() => {
    const formatDate = moment(selectedDayDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    if (getRowId) {
      navigate(`/time/${formatDate}/${getRowId}`);
    }
  }, [getRowId]);

  // Занятые дни
  const busyDays = daysListInfoData?.getDaysList?.map((item) => item.freeDate);

  return (
    <>
      <StyledHeaderSection>
        <DaysFilters
          organizations={organizationsOptions ?? []}
          selectOrganization={selectOrganization ?? ""}
          setSelectOrganization={setSelectOrganization}
          filials={filialsOptions ?? []}
          selectedFilial={selectedFilial}
          setSelectedFilial={setSelectedFilial}
          setSelectedDateStart={setSelectedDateStart}
          setSelectedDateEnd={setSelectedDateEnd}
        />

        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateDaysModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <IconEdit />
          </IconButton>
          <IconButton onClick={() => setOpenTemplateModal(true)}>
            <IconCreateTemplate />
          </IconButton>
          <IconButton onClick={() => setOpenApproveDeleteModal(true)}>
            <IconDelete />
          </IconButton>
        </StyledSectionButtons>
      </StyledHeaderSection>

      <CustomModal
        title="Создание нового дня"
        children={
          <CreateEditDaysForm
            filials={filialsOptions ?? []}
            setOpenCreateDaysModal={setOpenCreateDaysModal}
            refetcDaysList={refetcDaysList}
          />
        }
        open={openCreateDaysModal}
        setOpen={setOpenCreateDaysModal}
      />

      {redactionDayData?.getDataToReductionDay && (
        <CustomModal
          title="Редактирование дня"
          children={
            <CreateEditDaysForm
              filials={filialsOptions ?? []}
              refetcDaysList={refetcDaysList}
              selectedDayId={selectRowId}
              defaultValues={redactionDayData?.getDataToReductionDay}
              setOpenEditDaysModal={setOpenEditDaysModal}
              isEditDay
            />
          }
          open={openEditDaysModal}
          setOpen={setOpenEditDaysModal}
        />
      )}

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="День успешно создан"
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
            title="Вы точно хотите удалить день ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title="Копирование дня"
        open={openTemplateModal}
        setOpen={setOpenTemplateModal}
        children={
          <CopyDayForm
            annotation=""
            setOpen={setOpenTemplateModal}
            handleSubmit={(value) => handleCreateCopyDay(value)}
            busyDays={busyDays}
            selectRowId={selectRowId}
          />
        }
      />

      {loadingDaysList && <div>Загрузка</div>}

      {daysList?.length ? (
        <CustomTable
          tableHeaderCells={TableHeaderCells}
          tableCells={daysList}
          setSelectRowId={setSelectRowId}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setGetRowId={setGetRowId}
          setOpenTemplateModal={setOpenTemplateModal}
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

export default Days;
