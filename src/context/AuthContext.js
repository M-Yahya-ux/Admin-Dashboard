import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider to wrap the application
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
