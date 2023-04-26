import React, { useState } from "react";
import IconAdd from "../../icons/IconAdd";
import IconEdit from "../../icons/IconEdit";
import IconDelete from "../../icons/IconDelete";
import { IconButton } from "material-ui-core";
import CustomModal from "../../components/modals/customModal/customModal";
import BlockSuccess from "../../components/blockSuccess";
import ApproveDelete from "../../components/approveDelete";
import CreateEditDivisionForm from "../../components/forms/createEditDivisionForm";
import IconEye from "../../icons/IconEye";
import MoreDetailedDivision from "../../components/modals/moreDetailedDivision";
import DivisionsFilters from "../../components/filters/divisionsFilters";
import { dataDivisionDetailed } from "./consts";
import {
  StyledSectionButtons,
  StyledHeaderSection,
} from "./division.styled";

const Divisions: React.FC = () => {
  const [openCreateDivisionModal, setOpenCreateDivisionModal] = useState(false);
  const [openEditDivisionModal, setOpenEditDivisionModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openApproveDeleteModal, setOpenApproveDeleteModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleDelete = () => {
    console.log("handleDelete");
  };

  const handleChange = () => {
    console.log("handleChange");
  };

  return (
    <>
      <StyledHeaderSection>
        <DivisionsFilters />

        <StyledSectionButtons>
          <IconButton onClick={() => setOpenCreateDivisionModal(true)}>
            <IconAdd />
          </IconButton>
          <IconButton onClick={() => setOpenEditDivisionModal(true)}>
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
        title="Создание нового подразделения"
        children={<CreateEditDivisionForm />}
        open={openCreateDivisionModal}
        setOpen={setOpenCreateDivisionModal}
      />

      <CustomModal
        title="Редактирование подразделения"
        children={<CreateEditDivisionForm />}
        open={openEditDivisionModal}
        setOpen={setOpenEditDivisionModal}
      />

      <CustomModal
        title=""
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        children={
          <BlockSuccess
            title="Подразделение успешно создано"
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
            title="Вы точно хотите удалить подразделение ?"
            setOpen={setOpenApproveDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <CustomModal
        title="Подробнее о подразделение"
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        children={
          <MoreDetailedDivision
            title=""
            listItems={dataDivisionDetailed}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        }
      />
    </>
  );
};

export default Divisions;
