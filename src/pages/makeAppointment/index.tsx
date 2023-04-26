import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { IconButton, LinearProgress } from "material-ui-core";
import Box from "@mui/material/Box";
import IconAdd from "../../icons/IconAdd";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import CustomModal from "../../components/modals/customModal/customModal";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import CreateEditMakeAppointmentForm from "../../components/forms/createEditMakeAppointmentForm";
import MoreDetailedMakeAppointment from "../../components/modals/moreDetailedMakeAppointment";
import InformationAboutRecord from "../../components/informationAboutRecord";
import CustomTable from "../../components/customTable";
import MakeAppointmentFilters from "../../components/filters/makeAppointmentFilters";
import { GET_USER_INFO } from "../../api/query/users/useUserInfo";
import { GET_FILIALS } from "../../api/query/organizations/useOrganizations";
import { FilialsInput, FilialsInt } from "../../api/query/organizations/types";
import { UserInfoInput, UserInfoInt } from "../../api/query/users/types";
import {
  FOR_REDUCTION_DATA_APPOINTMENT,
  GET_MAKE_APPOINTMENT,
} from "../../api/query/makeAppointment/useMakeAppointment";
import { useMakeAppointmentMapper } from "../../mappers/makeAppointment.mapper";
import {
  getDataToReductionAppointmentIn,
  getDataToReductionAppointmentInput,
  MakeAppointmentInput,
  MakeAppointmentsIn,
} from "../../api/query/makeAppointment/types";
import { TableHeaderCells } from "./consts";
import {
  StyledSectionButtons,
  StyledHeaderSection,
  StyledTextNotResult,
} from "./makeAppointment.styled";
import { DELETE_MAKE_APPOINTMENT } from "../../api/mutations/deleteMakeAppointment/useDeleteMakeAppointment";
import { makeAnAppointmentMut } from "../../api/mutations/createMakeAppointment/types";
import {
  deleteAppointmentIn,
  deleteAppointmentInput,
} from "../../api/mutations/deleteMakeAppointment/types";
import { useGetUser } from "../../hooks/useGetUser";

const MakeAppointment: React.FC = () => {
  const [user] = useGetUser();

  const { data: userInfoData } = useQuery<UserInfoInt, UserInfoInput>(
    GET_USER_INFO,
    {
      variables: {
        userId: user ?? "", // В дальнейшем нужно получать id пользователя
      },
    }
  );

  const userOrganizationId = userInfoData?.getUserInfo[0].organizationId;

  const [openCreateMakeAppointmentModal, setOpenCreateMakeAppointmentModal] =
    useState(false);
  const [openEditMakeAppointmentModal, setOpenEditMakeAppointmentModal] =
    useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openConfirmationNewRecordModal, setOpenConfirmationNewRecordModal] =
    useState(false);
  const [selectRowId, setSelectRowId] = useState<string>();
  const [isEditMakeAppointment, setIsEditMakeAppointment] = useState(false);
  const [getNewMakeAppointment, setGetNewMakeAppointment] =
    useState<makeAnAppointmentMut[]>();
  const [pageCount, setPageCount] = useState(1);
  const [getRowId, setGetRowId] = useState("");
  const [isDesc, setIsDesc] = useState(false);

  //filters
  const [selectOrganization, setSelectOrganization] =
    useState(userOrganizationId);
  const [selectFilial, setSelectFilial] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [getFilials, { data: filialsData }] = useLazyQuery<
    FilialsInt,
    FilialsInput
  >(GET_FILIALS);

  const [
    getMakeAppointmentData,
    { data: makeAppointmentData, refetch: makeAppointmentRefetch },
  ] = useLazyQuery<MakeAppointmentsIn, MakeAppointmentInput>(
    GET_MAKE_APPOINTMENT
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

  // Получение данных для таблицы Записи на прием исходя из выбраных фильтров
  useEffect(() => {
    if (selectOrganization) {
      getMakeAppointmentData({
        variables: {
          makeAppointmentId: "",
          organizationId: selectOrganization ?? "",
          idDept: selectFilial ?? "",
          dateStart: dateStart,
          dateEnd: dateEnd,
          numberEntriesPage: 3,
          page: pageCount,
          columnName: "",
          typeSorting: "",
        },
      });
      getFilials({
        variables: {
          idOrg: selectOrganization ?? userOrganizationId ?? "",
        },
      });
    }
  }, [selectOrganization, selectFilial, dateStart, dateEnd, pageCount]);

  const [deleteMakeAppointment, { data: deleteMakeAppointmentData }] =
    useMutation<deleteAppointmentIn, deleteAppointmentInput>(
      DELETE_MAKE_APPOINTMENT
    );

  useEffect(() => {
    setSelectOrganization(userOrganizationId ?? "");
  }, [userOrganizationId]);

  useEffect(() => {
    if (openCreateMakeAppointmentModal) {
      setIsEditMakeAppointment(false);
    }
  }, [openCreateMakeAppointmentModal]);

  const handleDelete = () => {
    if (selectRowId) {
      deleteMakeAppointment({
        variables: {
          makeAppointmentId: selectRowId,
        },
      });
    }
    setOpenApproveDeleteModal(false);
  };

  const handleChange = () => {
    console.log("handleChange");
  };

  const dataTableRow = useMakeAppointmentMapper(
    makeAppointmentData?.getMakeAppointment ?? []
  );

  // Редактировать Запись на прием
  const handleEditMakeAppointment = () => {
    setOpenEditMakeAppointmentModal(true);
    if (selectRowId) {
      getDataToReductionAppointment({
        fetchPolicy: "network-only",
        variables: {
          makeAppointmentId: selectRowId ?? "",
          organizationId: selectOrganization ?? "",
        },
      });
    }
    setIsEditMakeAppointment(true);
  };

  // Сортировка (value - направление сортировки, name - название / id колонки (id колонки сделал как сказал бекенд)
  const handleSort = (value: boolean, name: string) => {
    getMakeAppointmentData({
      fetchPolicy: "network-only",
      variables: {
        makeAppointmentId: "",
        organizationId: selectOrganization ?? "",
        idDept: selectFilial ?? "",
        dateStart: dateStart,
        dateEnd: dateEnd,
        numberEntriesPage: 3,
        page: pageCount,
        columnName: name,
        typeSorting: value ? "asc" : "desc",
      },
    });
  };

  useEffect(() => {
    if (deleteMakeAppointmentData?.deleteAppointment?.isComplete) {
      makeAppointmentRefetch();
    }
  }, [deleteMakeAppointmentData]);

  // Данные о новой Записи на Прием
  useEffect(() => {
    if (getNewMakeAppointment && getNewMakeAppointment.length) {
      setOpenCreateMakeAppointmentModal(false);
      setOpenConfirmationNewRecordModal(true);
    } else {
      setOpenSuccessModal(false);
    }
  }, [getNewMakeAppointment]);

  // Запрос данных о выбраной записи на прием при клике на кнопку в строке таблицы
  useEffect(() => {
    if (getRowId) {
      getDataToReductionAppointment({
        fetchPolicy: "network-only",
        variables: {
          makeAppointmentId: getRowId ?? "",
          organizationId: selectOrganization ?? "",
        },
      });
    }
  }, [getRowId]);

  console.log("selectRowId: ", selectRowId);
  console.log("getRowId: ", getRowId);

  return (
    <>
      <StyledHeaderSection>
        <MakeAppointmentFilters
          organizations={userInfoData?.getUserInfo ?? []}
          filials={filialsData?.getDepts ?? []}
          defaultOrganization={userOrganizationId ?? ""}
          selectOrganization={selectOrganization ?? ""}
          selectFilial={selectFilial}
          setSelectOrganization={setSelectOrganization}
          setSelectFilial={setSelectFilial}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
        />

        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateMakeAppointmentModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton
            onClick={handleEditMakeAppointment}
            disabled={selectRowId && selectRowId.length ? false : true}
          >
            <IconEdit />
          </IconButton>
          <IconButton
            onClick={() => setOpenApproveDeleteModal(true)}
            disabled={selectRowId && selectRowId.length ? false : true}
          >
            <IconDelete />
          </IconButton>
        </StyledSectionButtons>
      </StyledHeaderSection>

      <CustomModal
        title="Создание новой записи на прием"
        children={
          <CreateEditMakeAppointmentForm
            organizations={userInfoData?.getUserInfo ?? []}
            filials={filialsData?.getDepts ?? []}
            makeAppointmentRefetch={makeAppointmentRefetch}
            selectRowId={selectRowId}
            setGetNewMakeAppointment={setGetNewMakeAppointment}
          />
        }
        open={openCreateMakeAppointmentModal}
        setOpen={setOpenCreateMakeAppointmentModal}
      />

      {loadingToReductionAppointment ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <CustomModal
          title="Редактирование записи на прием"
          children={
            getDataToReductionAppointmentData?.getDataToReductionAppointment && (
              <CreateEditMakeAppointmentForm
                organizations={userInfoData?.getUserInfo ?? []}
                filials={filialsData?.getDepts ?? []}
                isEditMakeAppointment={isEditMakeAppointment}
                selectRowId={selectRowId}
                selectOrganizationId={selectOrganization}
                makeAppointmentRefetch={makeAppointmentRefetch}
                getDataToReductionAppointmentData={
                  getDataToReductionAppointmentData.getDataToReductionAppointment
                }
                setOpenEditMakeAppointmentModal={
                  setOpenEditMakeAppointmentModal
                }
              />
            )
          }
          open={openEditMakeAppointmentModal}
          setOpen={setOpenEditMakeAppointmentModal}
        />
      )}

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Запись на прием успешно создана"
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
            title="Вы точно хотите удалить запись на прием ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      {loadingToReductionAppointment ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <CustomModal
          title="Подробнее о записи на прием"
          open={openInfoModal}
          setOpen={setOpenInfoModal}
          children={
            getDataToReductionAppointmentData?.getDataToReductionAppointment && (
              <MoreDetailedMakeAppointment
                title=""
                listItems={
                  getDataToReductionAppointmentData?.getDataToReductionAppointment
                }
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            )
          }
        />
      )}

      <CustomModal
        title="Создание новой записи на прием"
        open={openConfirmationNewRecordModal}
        setOpen={setOpenConfirmationNewRecordModal}
        children={
          <InformationAboutRecord
            dataRecord={getNewMakeAppointment ?? []}
            setOpen={setOpenConfirmationNewRecordModal}
          />
        }
      />

      {dataTableRow.length ? (
        <CustomTable
          tableHeaderCells={TableHeaderCells}
          tableCells={dataTableRow}
          setOpenInfoModal={setOpenInfoModal}
          setSelectRowId={setSelectRowId}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setGetRowId={setGetRowId}
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

export default MakeAppointment;
