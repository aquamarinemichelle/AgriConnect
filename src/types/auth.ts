export type ProductionType = 'crops' | 'livestock' | 'both';

export interface Farmer {
  uid: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  farmSize: number;
  productionType: ProductionType;
  crops?: string;
  livestock?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  name: string;
  phone: string;
  address: string;
  farmSize: number;
  productionType: ProductionType;
  crops?: string;
  livestock?: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: Farmer | null;
  loading: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<Farmer>) => Promise<void>;
}