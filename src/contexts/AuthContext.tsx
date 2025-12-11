import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmer, AuthContextType, UserCredentials, RegisterData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: UserCredentials): Promise<void> => {
    // Mock login - replace with your actual backend API
    const mockUser: Farmer = {
      uid: Date.now().toString(),
      email: credentials.email,
      name: credentials.email.split('@')[0],
      phone: '',
      address: '',
      farmSize: 0,
      productionType: 'crops',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (data: RegisterData): Promise<void> => {
    // Mock register - replace with your actual backend API
    const mockUser: Farmer = {
      uid: Date.now().toString(),
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
      farmSize: data.farmSize,
      productionType: data.productionType,
      crops: data.crops,
      livestock: data.livestock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string): Promise<void> => {
    // Mock password reset - replace with your actual backend API
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const updateProfile = async (data: Partial<Farmer>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = { ...user, ...data, updatedAt: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};