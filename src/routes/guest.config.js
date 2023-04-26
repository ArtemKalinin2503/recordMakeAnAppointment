import Authorization from "../pages/authorization";
import MakeAppointmentOutside from "../pages/makeAppointmentOutside";

const GUEST_ROUTES = [
  {
    path: '/login',
    component: <Authorization />,
    exact: true
  },
  {
    path: '/makeAppointment/outside',
    component: <MakeAppointmentOutside />,
    exact: true
  }
];

export const GUEST_PATHES = GUEST_ROUTES.map((item) => item.path);

export default GUEST_ROUTES;