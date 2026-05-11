import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../types";
import { auth, db } from "../config/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 AuthProvider inicializando...");

    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser: FirebaseUser | null) => {
        console.log("Auth changed:", firebaseUser?.email || "null");

        if (firebaseUser) {
          try {
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            let userData: User;

            if (userSnap.exists()) {
              const data = userSnap.data() as any;
              userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || null,
                displayName:
                  firebaseUser.displayName || data.displayName || null,
                photoURL: firebaseUser.photoURL || null,
                purchasedCourses: data.purchasedCourses || [],
              };
            } else {
              // Cria usuário no Firestore
              await setDoc(userRef, {
                purchasedCourses: [],
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || "",
                createdAt: new Date().toISOString(),
              });

              userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || null,
                displayName: firebaseUser.displayName || null,
                photoURL: firebaseUser.photoURL || null,
                purchasedCourses: [],
              };
            }

            setUser(userData);
          } catch (error) {
            console.error("Firestore error:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    await createUserWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const logout = useCallback(async () => {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
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
