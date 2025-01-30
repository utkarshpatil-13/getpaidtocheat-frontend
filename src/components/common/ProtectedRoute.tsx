import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';  // Use custom hook for context

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useContext(UserContext);

    if (!context) {
        return <Navigate to="/login" />;
    }

    // const {user} = context;

  return <>{children}</>;
};

export default ProtectedRoute;
