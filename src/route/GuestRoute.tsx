import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GUEST_ROUTES from '../routes/guest.config';
import { IRoutes } from '../routes/types';

const GuestRoute = () => {
  return (
    <div>
      {GUEST_ROUTES.map((item: IRoutes, index: number) => (
        <Routes key={index}>
          <Route path={item.path} element={item.component} />
        </Routes>
      ))}
  </div>
  );
};

export default GuestRoute;
