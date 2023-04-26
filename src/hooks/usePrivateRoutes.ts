import PRIVATE_ROUTES from "../routes/private.config";
import { intersection } from "lodash";
import { IRoutes } from "../routes/types";

// Здесь фильтруются доступные роутинги исходя какие разделы доступны определенным ролям
const usePrivateRoutes = (userRoles: string[]) => {
  const privateRoutes = PRIVATE_ROUTES.filter((item: IRoutes) => {
    return intersection(item.roles, userRoles).length > 0;
  });
  return [privateRoutes];
}

export default usePrivateRoutes;