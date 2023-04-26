import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROLES } from '../routes/consts';
import usePrivateRoutes from '../hooks/usePrivateRoutes';
import { IRoutes } from '../routes/types';

const PrivateRoute = () => {

  const userRoles: any = [localStorage.getItem('roles')]

  const [ privateRoutes ] = usePrivateRoutes(userRoles)

  // Доступ разрешен только ролям из userRoles
  const hasAccess = useMemo(() => {
    return !!userRoles?.find((role: any) => ROLES.includes(role));
  }, [userRoles]);

  return (
    <div>
      {hasAccess && (
        privateRoutes?.map((item: IRoutes ) => (
          <Routes key={item.breadcrumb}>
            <Route path={item.path} element={item.component} key={item.breadcrumb} />
          </Routes>
        ))
      )}
    </div>
  )
};

export default PrivateRoute;
