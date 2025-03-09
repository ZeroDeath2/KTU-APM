import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'student' | 'staff' | 'admin' | null;
  login: (userType: 'student' | 'staff' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff' | 'admin' | null>(null);

  const login = (type: 'student' | 'staff' | 'admin') => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('userRole', type);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
