import React, { FC } from "react";
import MakeAppointmentOutsideForm from "../../components/forms/makeAppointmentOutsideForm";
import { StyledTitelPage } from "./makeAppointmentOutside.styled";
import { IMakeAppointmentOutsideProps } from "./types";

const MakeAppointmentOutside: FC = ({
}:IMakeAppointmentOutsideProps) => {  
  return (
    <div>
      <StyledTitelPage>
        Запись на прием
      </StyledTitelPage>
      
      <MakeAppointmentOutsideForm />
      
    </div>
  )
}

export default MakeAppointmentOutside;