import { ADMIN } from "../../../routes/consts";
import { ISettingsThemas } from "./types";

export const settingsTheme: ISettingsThemas[] = [
  {
    id: "spec",
    name: "Активна в Веб-интерфейсе самообслуживания",
  },
  {
    id: "avail",
    name: "Активна через API",
    disabled: localStorage.getItem('roles') === ADMIN
  },
  {
    id: "selfService",
    name: "Отдельные интервалы"
  },
];

export const settingsID = {
  spec: 'spec',
  avail: 'avail',
  selfService: 'selfService'
}