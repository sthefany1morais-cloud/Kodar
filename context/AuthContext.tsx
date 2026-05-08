import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
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

  useEffect(() => {
    console.log("AuthProvider inicializando...");

    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser: FirebaseUser | null) => {
        console.log("Auth changed:", firebaseUser?.email || "null");

        if (firebaseUser) {
          try {
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            let courses: string[] = [];
            if (userSnap.exists()) {
              courses = userSnap.data()?.purchasedCourses || [];
            } else {
              await setDoc(userRef, {
                purchasedCourses: [],
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || "",
                createdAt: new Date().toISOString(),
              });
            }

            const userData: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || null,
              displayName: firebaseUser.displayName || null,
              photoURL: firebaseUser.photoURL || null,
              purchasedCourses: courses,
            };

            setUser(userData);
            setPurchasedCourses(courses);

            const unsubUser = onSnapshot(userRef, (snap) => {
              if (snap.exists()) {
                const data = snap.data() as any;
                const newCourses = data.purchasedCourses || [];
                setPurchasedCourses(newCourses);
                console.log("Cursos atualizados:", newCourses.length);
              }
            });

            return () => unsubUser();
          } catch (error) {
            console.error("Firestore error:", error);
          }
        } else {
          setUser(null);
          setPurchasedCourses([]);
        }
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const purchaseCourse = useCallback(
    async (courseId: string) => {
      if (!user) throw new Error("Não autenticado");

      try {
        console.log("Comprando:", courseId);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          purchasedCourses: arrayUnion(courseId),
        });
        console.log("Compra OK!");
      } catch (error: any) {
        console.error("Compra error:", error);
        throw error;
      }
    },
    [user],
  );

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
    purchasedCourses,
    login,
    signup,
    logout,
    purchaseCourse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider");
  return context;
}
