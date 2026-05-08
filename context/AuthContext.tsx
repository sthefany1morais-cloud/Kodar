import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User as FirebaseUser } from "firebase/auth";
import { User as UserType } from "../types";
import { auth } from "../config/firebase";

interface AuthContextValue {
  user: UserType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser: FirebaseUser | null) => {
        console.log("Auth State:", firebaseUser?.email || "logout");

        if (firebaseUser) {
          const userData: UserType = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || null,
            displayName: firebaseUser.displayName || null,
            photoURL: firebaseUser.photoURL || null,
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      console.log("Login:", email);
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      console.log("Signup:", email);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      console.error("Signup Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const { signOut } = await import("firebase/auth");
      console.log("Logout");
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider");
  return context;
}
