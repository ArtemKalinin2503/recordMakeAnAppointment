import React, { useState } from "react";
import { IconButton } from "material-ui-core";
import CustomModal from "../../components/modals/customModal/customModal";
import MoreDetailedQualityOfservice from "../../components/modals/moreDetailedQualityOfservice";
import IconEye from "../../icons/IconEye";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconQuestionSmall from "../../icons/IconQuestionSmall";
import IconQualityOfServiceSmall from "../../icons/IconQualityOfServiceSmall";
import QualityOfserviceFilters from "../../components/filters/qualityOfserviceFilters";
import CustomRating from "../../components/customRaiting";
import { dataQualityOfServiceDetailed } from "./consts";
import { TabPanelProps } from "./types";
import {
  StyledSectionButtons,
  StyledTabs,
  StyledTab,
  StyledTabsWrapper,
} from "./qualityOfservice.styled";

const QualityOfservice: React.FC = () => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [selectTabs, setSelectTabs] = useState(0);

  const handleDelete = () => {
    console.log("handleDelete");
  };

  const handleChange = () => {
    console.log("handleChange");
  };

  // Tabs
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectTabs(newValue);
  };

  return (
    <>
        <StyledSectionButtons>
          <IconButton onClick={() => setOpenInfoModal(true)}>
            <IconEye />
          </IconButton>
        </StyledSectionButtons>

        <CustomModal
          title="Подробнее о вопросе качества"
          open={openInfoModal}
          setOpen={setOpenInfoModal}
          children={
            <MoreDetailedQualityOfservice
              title=""
              listItems={dataQualityOfServiceDetailed}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          }
        />

        <StyledTabsWrapper>
          <StyledTabs
            value={selectTabs}
            onChange={handleChangeTab}
          >
            <StyledTab
              icon={<IconQualityOfServiceSmall />}
              iconPosition="start"
              label="Вопросы для оценки"
            />
            <StyledTab
              icon={<IconQuestionSmall />}
              iconPosition="start"
              label="Оценки качества"
            />
          </StyledTabs>
          {selectTabs === 1 && (
            <QualityOfserviceFilters />
          )}
        </StyledTabsWrapper>
        <TabPanel value={selectTabs} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={selectTabs} index={1}>
          <CustomRating />
        </TabPanel>

    </>
  );
};

export default QualityOfservice;
