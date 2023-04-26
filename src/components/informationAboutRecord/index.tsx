import React from "react";
import IconLogoRecord from "../../icons/IconLogoRecord";
import {
  StyledAppeal,
  StyledAnnotation,
  StyledBodySection,
  StyledButtonClose,
  StyledDate,
  StyledDateHeaderItem,
  StyledDateSection,
  StyledDateWrapper,
  StyledFooterSection,
  StyledHeader,
  StyledIconWrapper,
  StyledInstraction,
  StyledInstractionItem,
  StyledMainWrapper,
  StyledName,
  StyledNameSection,
  StyledOrganizationAddresName,
  StyledOrganizationAddressWrapper,
  StyledOrganizationName,
  StyledOrganizationNameWrapper,
  StyledOrganizationSection,
  StyledPhone,
  StyledRecordName,
  StyledRecordSection,
} from "./informationAboutRecord.styled";
import { InformationAboutRecordProps } from "./types";

const InformationAboutRecord = ({
  dataRecord,
  setOpen,
  isOutSideRecord
}: InformationAboutRecordProps) => {

  console.log('dataRecord: ', dataRecord)

  return (
    <StyledMainWrapper>
      {!isOutSideRecord && (
        <StyledAnnotation>
          Пожалуйста, проговорите клиенту подробности произведенной записи на
          приём.
        </StyledAnnotation>
      )}

      <StyledIconWrapper>
        <IconLogoRecord />
      </StyledIconWrapper>

      <StyledBodySection>
        <StyledNameSection>
          Уважаемый(ая),
          <StyledName>{dataRecord[0]?.clientName}</StyledName>
          Вы записаны на прием!
        </StyledNameSection>

        <StyledDateSection>
          <StyledHeader>
            <StyledDateHeaderItem>Дата</StyledDateHeaderItem>
            <StyledDateHeaderItem>Время</StyledDateHeaderItem>
          </StyledHeader>

          <StyledDateWrapper>
            <StyledDate>{dataRecord[0]?.date}</StyledDate>
            <StyledDate>{dataRecord[0]?.dateFormat}</StyledDate>
          </StyledDateWrapper>
        </StyledDateSection>

        <StyledOrganizationSection>
          <StyledOrganizationNameWrapper>
            Организация
            <StyledOrganizationName>
              {dataRecord[0]?.nameOrg}
            </StyledOrganizationName>
          </StyledOrganizationNameWrapper>

          <StyledOrganizationAddressWrapper>
            Адрес
            <StyledOrganizationAddresName>
              {dataRecord[0]?.deptAddress}
            </StyledOrganizationAddresName>
          </StyledOrganizationAddressWrapper>
        </StyledOrganizationSection>

        <StyledRecordSection>
          Номер записи
          <StyledRecordName>{dataRecord[0]?.entryNumber}</StyledRecordName>
          <StyledInstraction>
            <StyledInstractionItem>
              Пожалуйста сохраните его
            </StyledInstractionItem>

            <StyledInstractionItem>
              Он потребуется при Вашем обращении
            </StyledInstractionItem>
          </StyledInstraction>
        </StyledRecordSection>

        <StyledFooterSection>
          <StyledAppeal>
            Если потребуется отменить или перенести запись, пожалуйста сообщите
            нам по номеру
          </StyledAppeal>
          <StyledPhone>8 (888) 888 88 88</StyledPhone>
        </StyledFooterSection>
      </StyledBodySection>
      <StyledButtonClose onClick={() => setOpen(true)}>
        Закрыть
      </StyledButtonClose>
    </StyledMainWrapper>
  );
};

export default InformationAboutRecord;
