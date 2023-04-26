import { Button } from 'material-ui-core';
import styled from 'styled-components';

export const StyledMainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  height: 650px;
`;

export const StyledAnnotation = styled.div`
  display: flex;
  color: #23262F;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  justify-content: center;
  margin: 20px 0 32px 0;
  text-align: center;
`;

export const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const StyledBodySection = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

export const StyledNameSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: #7314d9;
  color: white;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 22px 50px 22px 50px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    left: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
  &:after {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    right: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
`;

export const StyledName = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledDateSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: #7314d9;
  color: white;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 22px 50px 22px 50px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    left: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
  &:after {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    right: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const StyledDateHeaderItem = styled.div`
  display: flex;
`;

export const StyledDateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const StyledDate = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledOrganizationSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  background: #7314d9;
  color: white;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 22px 50px 22px 50px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    left: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
  &:after {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    right: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
`;

export const StyledOrganizationNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledOrganizationName = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledOrganizationAddressWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledOrganizationAddresName = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledRecordSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: #7314d9;
  color: white;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 22px 50px 22px 50px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    left: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
  &:after {
    content: "";
    border-radius: 50%;
    background: white;
    z-index: 1;
    position: absolute;
    right: -9px;
    width: 20px;
    height: 20px;
    bottom: 0px;
  }
`;

export const StyledRecordName = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 600;
  font-size: 34px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledInstraction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export const StyledInstractionItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const StyledFooterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background: #7314d9;
  color: white;
  font-size: 14px;
  font-weight: 400;
  padding: 22px 50px 22px 50px;
`;

export const StyledAppeal = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

export const StyledPhone = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledButtonClose = styled(Button)`
  background: white;
  width: 100%;
  margin-top: 32px;
  padding: 13px 25px;
  border: 1px solid #7314D9;
  border-radius: 100px;
`;