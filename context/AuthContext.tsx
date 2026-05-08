import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { User } from "../types";
import { auth, db } from "../config/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  purchaseCourse: (courseId: string) => Promise<void>;
  purchasedCourses: string[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("AuthProvider inicializando...");

  useEffect(() => {
    console.log("Iniciando onAuthStateChanged...");

    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser: FirebaseUser | null) => {
        console.log(
          "onAuthStateChanged chamado:",
          firebaseUser?.email || "null",
        );

        if (firebaseUser) {
          try {
            console.log("Buscando dados do usuário no Firestore...");
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            let courses: string[] = [];
            if (userSnap.exists()) {
              courses = userSnap.data()?.purchasedCourses || [];
              console.log("Dados do Firestore:", courses.length, "cursos");
            } else {
              console.log("Criando documento do usuário...");
              await setDoc(userRef, {
                purchasedCourses: [],
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || "",
                createdAt: new Date().toISOString(),
              });
              courses = [];
            }

            const userData: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || null,
              displayName: firebaseUser.displayName || null,
              photoURL: firebaseUser.photoURL || null,
              purchasedCourses: courses,
            };

            console.log("User carregado:", userData.email);
            setUser(userData);
            setPurchasedCourses(courses);
          } catch (error) {
            console.error("Erro Firestore:", error);
            const userData: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || null,
              displayName: firebaseUser.displayName || null,
              photoURL: firebaseUser.photoURL || null,
              purchasedCourses: [],
            };
            setUser(userData);
            setPurchasedCourses([]);
          }
        } else {
          console.log("Usuário deslogado");
          setUser(null);
          setPurchasedCourses([]);
        }

        console.log("AuthContext loading = false");
        setLoading(false);
      },
      (error) => {
        console.error("Erro no onAuthStateChanged:", error);
        setLoading(false);
      },
    );

    return () => {
      console.log("Limpando AuthContext");
      unsubscribe();
    };
  }, []);

  const purchaseCourse = useCallback(async (courseId: string) => {
    console.log("purchaseCourse:", courseId);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    console.log("login chamado:", email);
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("signInWithEmailAndPassword OK");
    } catch (error: any) {
      console.error("signInWithEmailAndPassword erro:", error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    console.log("signup chamado:", email);
    try {
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      console.error("signup erro:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    console.log("logout chamado");
    try {
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch (error: any) {
      console.error("logout erro:", error);
      throw error;
    }
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    purchasedCourses,
    login,
    signup,
    logout,
    purchaseCourse,
  };

  console.log("AuthProvider render - loading:", loading, "user:", user?.email);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider");
  return context;
}
