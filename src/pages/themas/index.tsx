import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "material-ui-core";
import IconAdd from "../../icons/IconAdd";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import CustomModal from "../../components/modals/customModal/customModal";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import MoreDetailedTheme from "../../components/modals/moreDetailedTheme";
import CreateEditThemeForm from "../../components/forms/createEditThemeForm";
import { dataThemeDetailed, TableHeaderCells } from "./consts";
import {
  StyledHeaderSection,
  StyledSectionButtons,
  StyledTextNotResult,
} from "./themes.styled";
import ThemesFilters from "../../components/filters/themesFilters";
import { UserInfoInput, UserInfoInt } from "../../api/query/users/types";
import { GET_USER_INFO } from "../../api/query/users/useUserInfo";
import CustomTable from "../../components/customTable";
import {
  GET_INFO_THEME_REDACTION,
  GET_THEMES_LIST,
} from "../../api/query/themas/useThemas";
import {
  ThemaListInput,
  ThemasListint,
  ThemasRedactionInput,
  ThemasRedactionInt,
} from "../../api/query/themas/types";
import { useThemasListMapper } from "../../mappers/themasList.mapper";
import { FilialsInput, FilialsInt } from "../../api/query/organizations/types";
import { GET_FILIALS } from "../../api/query/organizations/useOrganizations";
import { useFilialsMapper } from "../../mappers/filials.mapper";
import { FilialsMapper } from "../../mappers/types";
import { DELETE_THEMA } from "../../api/mutations/deleteThema/useDeleteThema";
import {
  deleteThemaIn,
  deleteThemaInput,
} from "../../api/mutations/deleteThema/types";
import { useGetUser } from "../../hooks/useGetUser";
import { ADMIN } from "../../routes/consts";

const ThemesPage: React.FC = () => {
  const [openCreateThemeModal, setOpenCreateThemeModal] = useState(false);
  const [openEditThemeModal, setOpenEditThemeModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
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

  useEffect(() => {
    setSelectOrganization(userInfoData?.getUserInfo[0].organizationId);
  }, [userInfoData]);

  const [
    getThemasList,
    { data: themasListData, refetch: refetchGetThemasList },
  ] = useLazyQuery<ThemasListint, ThemaListInput>(GET_THEMES_LIST);

  const [getThemaRedaction, { data: themasRedactionInfo }] = useLazyQuery<
    ThemasRedactionInt,
    ThemasRedactionInput
  >(GET_INFO_THEME_REDACTION);

  const [deleteThema, { data: deleteThemaData }] = useMutation<
    deleteThemaIn,
    deleteThemaInput
  >(DELETE_THEMA);

  useEffect(() => {
    if (selectOrganization) {
      getThemasList({
        variables: {
          idOrg: selectOrganization ?? "",
          numberEntriesPage: 10,
          page: pageCount,
          typeSorting: "",
          columnName: "",
        },
      });
      getFilials({
        variables: {
          idOrg: selectOrganization ?? "",
        },
      });
    }
  }, [getFilials, selectOrganization, userInfoData, pageCount]);

  // Когда показали окно Редактирования
  useEffect(() => {
    if (openEditThemeModal && selectRowId) {
      getThemaRedaction({
        fetchPolicy: "network-only",
        variables: {
          idTopic: selectRowId ?? "",
        },
      });
    }
  }, [openEditThemeModal]);

  const dataTableRow = useThemasListMapper(themasListData?.getTopicsList ?? []);

  const filialsOptions: FilialsMapper[] = useFilialsMapper(
    filialsData?.getDepts ?? []
  );

  const handleDelete = () => {
    if (selectRowId) {
      deleteThema({
        variables: {
          idTopic: selectRowId ?? "",
        },
      });
    }
  };

  useEffect(() => {
    if (deleteThemaData) {
      refetchGetThemasList();
      setOpenApproveDeleteModal(false);
    }
  }, [deleteThemaData]);

  const handleChange = () => {
    console.log("handleChange");
  };

  // Сортировка (value - направление сортировки, name - название / id колонки (id колонки сделал как сказал бекенд)
  const handleSort = (value: boolean, name: string) => {
    getThemasList({
      fetchPolicy: "network-only",
      variables: {
        idOrg: selectOrganization ?? "",
        numberEntriesPage: 10,
        page: pageCount,
        columnName: name,
        typeSorting: value ? "asc" : "desc",
      },
    });
  };

  const isAdmin = localStorage.getItem('roles') === ADMIN

  return (
    <>
      <StyledHeaderSection>
        <ThemesFilters
          organizations={userInfoData?.getUserInfo ?? []}
          selectOrganization={selectOrganization ?? ""}
          setSelectOrganization={setSelectOrganization}
        />

        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateThemeModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton
            onClick={() => setOpenEditThemeModal(true)}
            disabled={!selectRowId?.length || isAdmin}
          >
            <IconEdit />
          </IconButton>
          <IconButton
            onClick={() => setOpenApproveDeleteModal(true)}
            disabled={!selectRowId?.length}
          >
            <IconDelete />
          </IconButton>
        </StyledSectionButtons>
      </StyledHeaderSection>

      <CustomModal
        title="Создание новой темы"
        children={
          <CreateEditThemeForm
            organizations={userInfoData?.getUserInfo ?? []}
            filials={filialsOptions}
            refetchGetThemasList={refetchGetThemasList}
            setOpenCreateThemeModal={setOpenCreateThemeModal}
          />
        }
        open={openCreateThemeModal}
        setOpen={setOpenCreateThemeModal}
      />

      {themasRedactionInfo && (
        <CustomModal
          title="Редактирование темы"
          children={
            <CreateEditThemeForm
              organizations={userInfoData?.getUserInfo ?? []}
              selectOrganizationId={selectOrganization}
              filials={filialsOptions}
              refetchGetThemasList={refetchGetThemasList}
              selectRowId={selectRowId}
              setSelectOrganizationId={setSelectOrganization}
              themasListData={themasRedactionInfo}
              setOpenEditThemeModal={setOpenEditThemeModal}
              isEditThema
            />
          }
          open={openEditThemeModal}
          setOpen={setOpenEditThemeModal}
        />
      )}

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Тема успешно создана"
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
            title="Вы точно хотите удалить тему ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title="Подробнее о темe"
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        children={
          <MoreDetailedTheme
            title=""
            listItems={dataThemeDetailed}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        }
      />

      {dataTableRow?.length ? (
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

export default ThemesPage;
