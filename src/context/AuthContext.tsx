import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'student' | 'staff' | null;
  login: (type: 'student' | 'staff') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff' | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === 'student' || storedUserType === 'staff') {
      setIsAuthenticated(true);
      setUserType(storedUserType);
    }
  }, []);

  const login = (type: 'student' | 'staff') => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
