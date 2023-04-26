import React, { useState } from "react";
import CustomModal from "../../components/modals/customModal/customModal";
import CreateEditUserForm from "../../components/forms/createEditUserForm";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import MoreDetailedUser from "../../components/modals/moreDetailedUser";
import IconDelete from "../../icons/IconDelete";
import { IconButton } from "material-ui-core";
import IconAdd from "../../icons/IconAdd";
import IconEdit from "../../icons/IconEdit";
import IconEye from "../../icons/IconEye";
import { UsersProps } from "./types";
import { StyledHeaderSection, StyledSectionButtons } from "./users.styled";
import { dataOfUserDetailed } from "./consts";
import UsersFilters from "../../components/filters/usersFilters";

const Users: React.FC<{ users?: UsersProps[] }> = ({ users }) => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);

  const handleChange = () => {
    console.log("handleChange");
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  return (
    <>
      <StyledHeaderSection>
        <UsersFilters />
        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateUserModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton onClick={() => setOpenEditUserModal(true)}>
            <IconEdit />
          </IconButton>
          <IconButton onClick={() => setOpenApproveDeleteModal(true)}>
            <IconDelete />
          </IconButton>
          <IconButton onClick={() => setOpenInfoModal(true)}>
            <IconEye />
          </IconButton>
        </StyledSectionButtons>
      </StyledHeaderSection>

      <CustomModal
        title="Создание нового пользователя"
        children={<CreateEditUserForm />}
        open={openCreateUserModal}
        setOpen={setOpenCreateUserModal}
      />

      <CustomModal
        title="Редактирование пользователя"
        children={<CreateEditUserForm />}
        open={openEditUserModal}
        setOpen={setOpenEditUserModal}
      />

      <CustomModal
        title="Подробнее о пользователе"
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        children={
          <MoreDetailedUser
            title=""
            listItems={dataOfUserDetailed}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Пользователь успешно создан"
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
            title="Вы точно хотите удалить пользователя ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
    </>
  );
};

export default Users;
