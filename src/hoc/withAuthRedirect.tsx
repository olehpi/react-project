import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../store/redux-store';

export const withAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    if (!isAuth) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
};
