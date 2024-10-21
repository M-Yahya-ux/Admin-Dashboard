// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { permissions } from '../permissions'; // Import the permissions

const PrivateRoute = ({ component: Component, requiredPages }) => {
  const { auth } = useContext(AuthContext);

  // Check if the user is authenticated and has access to the required pages
  const hasAccess = auth.isAuthenticated && permissions[auth.user.role]?.some(page => requiredPages.includes(page));

  return hasAccess ? <Component /> : <Navigate to="/403" />;
};

export default PrivateRoute;
