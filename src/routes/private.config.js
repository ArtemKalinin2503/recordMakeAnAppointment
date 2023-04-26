import { MAINADMIN, OPERATOR, ADMIN} from './consts';
import Users from '../pages/users';
import Organizations from '../pages/organizations';
import Divisions from '../pages/divisions';
import ThemesPage from '../pages/themas';
import Days from '../pages/days';
import TimePage from '../pages/time';
import MakeAppointment from '../pages/makeAppointment';
import QualityOfservice from '../pages/qualityOfservice';
import IconUsers from "../icons/IconUsers";
import IconOrganizations from "../icons/IconOrganizations";
import IconDivisions from '../icons/IconDivisions';
import IconThemes from '../icons/IconThemes';
import IconDays from '../icons/IconDays';
import IconTime from '../icons/IconTime';
import IconMakeAppointment from '../icons/IconMakeAppointment';
import IconQualityOfService from '../icons/IconQualityOfService';

const PRIVATE_ROUTES = [
  {
    path: '/users',
    component: <Users />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Пользователи',
    icon: {
      component: IconUsers,
    }
  },
  {
    path: '/organizations',
    component: <Organizations />,
    exact: true,
    roles: [MAINADMIN, ADMIN, ADMIN],
    breadcrumb: 'Организации',
    icon: {
      component: IconOrganizations,
    }
  },
  {
    path: '/divisions',
    component: <Divisions />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Подразделения',
    icon: {
      component: IconDivisions,
    }
  },
  {
    path: '/themes',
    component: <ThemesPage />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Темы',
    icon: {
      component: IconThemes,
    }
  },
  {
    path: '/days',
    component: <Days />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Дни',
    icon: {
      component: IconDays,
    }
  },
  {
    path: '/time/:date/:idDay',
    component: <TimePage />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Время',
    icon: {
      component: IconTime,
    },
    isHeaden: true
  },
  {
    path: '/makeAppointment',
    component: <MakeAppointment />,
    exact: true,
    roles: [MAINADMIN, ADMIN, OPERATOR],
    breadcrumb: 'Запись на прием',
    icon: {
      component: IconMakeAppointment,
    }
  },
  {
    path: '/qualityOfservice',
    component: <QualityOfservice />,
    exact: true,
    roles: [MAINADMIN, ADMIN],
    breadcrumb: 'Оценка качества',
    icon: {
      component: IconQualityOfService,
    }
  }
];

export default PRIVATE_ROUTES;
