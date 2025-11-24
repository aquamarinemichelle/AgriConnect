import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FirebaseAuthService } from '../services/firebaseService';
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          const farmerData = await FirebaseAuthService.getFarmerData(firebaseUser.uid);
          setUser(farmerData);
        } catch (error) {
          console.error('Error fetching farmer data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (credentials: UserCredentials): Promise<void> => {
    try {
      const farmer = await FirebaseAuthService.loginFarmer(credentials);
      setUser(farmer);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      const farmer = await FirebaseAuthService.registerFarmer(data);
      setUser(farmer);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await FirebaseAuthService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await FirebaseAuthService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<Farmer>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await FirebaseAuthService.updateFarmerProfile(user.uid, data);
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      throw error;
    }
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