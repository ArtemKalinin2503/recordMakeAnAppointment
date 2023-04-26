import React, { useState } from "react";
import CreateEditOrganizationForm from "../../components/forms/createEditOrganizationForm";
import CustomModal from "../../components/modals/customModal/customModal";
import IconAdd from "../../icons/IconAdd";
import { IconButton } from "material-ui-core";
import IconEdit from "../../icons/IconEdit";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import IconDelete from "../../icons/IconDelete";
import IconEye from "../../icons/IconEye";
import MoreDetailedOrganization from "../../components/modals/moreDetailedOrganization";
import { dataOrganizationDetailed } from "./consts";
import { StyledSectionButtons } from "./organizations.styled";

const Organizations: React.FC = () => {
  const [openCreateOrganizationModal, setOpenCreateOrganizationModal] =
    useState(false);
  const [openEditOrganizationModal, setOpenEditOrganizationModal] =
    useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleChange = () => {
    console.log("handleChange");
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  return (
    <>
      <StyledSectionButtons>
        <IconButton onClick={() => setOpenCreateOrganizationModal(true)}>
          <IconAdd />
        </IconButton>
        <IconButton onClick={() => setOpenEditOrganizationModal(true)}>
          <IconEdit />
        </IconButton>
        <IconButton onClick={() => setOpenApproveDeleteModal(true)}>
          <IconDelete />
        </IconButton>
        <IconButton onClick={() => setOpenInfoModal(true)}>
          <IconEye />
        </IconButton>
      </StyledSectionButtons>

      <CustomModal
        title="Создание новой организации"
        children={<CreateEditOrganizationForm />}
        open={openCreateOrganizationModal}
        setOpen={setOpenCreateOrganizationModal}
      />

      <CustomModal
        title="Редактирование организации"
        children={<CreateEditOrganizationForm />}
        open={openEditOrganizationModal}
        setOpen={setOpenEditOrganizationModal}
      />

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Организация успешно создана"
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
            title="Вы точно хотите удалить организацию ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title="Подробнее о организации"
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        children={
          <MoreDetailedOrganization
            title=""
            listItems={dataOrganizationDetailed}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        }
      />
    </>
  );
};

export default Organizations;
