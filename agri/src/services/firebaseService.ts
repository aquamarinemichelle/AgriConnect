import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    updateProfile as updateAuthProfile,
    User 
  } from 'firebase/auth';
  import { ref, set, get, update } from 'firebase/database';
  import { auth, database } from '../firebase/config';
  import { Farmer, RegisterData, UserCredentials } from '../types/auth';
  
  export class FirebaseAuthService {
    // Register new farmer
    static async registerFarmer(data: RegisterData): Promise<Farmer> {
      try {
        // Create authentication user
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          data.email, 
          data.password
        );
        
        const user = userCredential.user;
        const timestamp = new Date().toISOString();
  
        // Prepare farmer data
        const farmerData: Omit<Farmer, 'uid'> = {
          email: data.email,
          name: data.name,
          phone: data.phone,
          address: data.address,
          farmSize: data.farmSize,
          productionType: data.productionType,
          crops: data.crops,
          livestock: data.livestock,
          createdAt: timestamp,
          updatedAt: timestamp
        };
  
        // Save farmer data to Realtime Database
        await set(ref(database, `farmers/${user.uid}`), farmerData);
  
        // Update auth profile
        await updateAuthProfile(user, {
          displayName: data.name
        });
  
        return {
          uid: user.uid,
          ...farmerData
        };
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Login farmer
    static async loginFarmer(credentials: UserCredentials): Promise<Farmer> {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        
        const user = userCredential.user;
        return await this.getFarmerData(user.uid);
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Get farmer data from Realtime Database
    static async getFarmerData(uid: string): Promise<Farmer> {
      try {
        const snapshot = await get(ref(database, `farmers/${uid}`));
        
        if (!snapshot.exists()) {
          throw new Error('Farmer data not found');
        }
  
        const farmerData = snapshot.val();
        return {
          uid,
          ...farmerData
        };
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Reset password
    static async resetPassword(email: string): Promise<void> {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Update farmer profile
    static async updateFarmerProfile(uid: string, data: Partial<Farmer>): Promise<void> {
      try {
        const updates = {
          ...data,
          updatedAt: new Date().toISOString()
        };
  
        await update(ref(database, `farmers/${uid}`), updates);
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Logout
    static async logout(): Promise<void> {
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error(this.getErrorMessage(error));
      }
    }
  
    // Error message helper
    private static getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        const firebaseError = error as any;
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            return 'Email is already registered';
          case 'auth/invalid-email':
            return 'Invalid email address';
          case 'auth/weak-password':
            return 'Password should be at least 6 characters';
          case 'auth/user-not-found':
            return 'No account found with this email';
          case 'auth/wrong-password':
            return 'Incorrect password';
          case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later.';
          default:
            return firebaseError.message || 'An error occurred';
        }
      }
      return 'An unexpected error occurred';
    }
  }