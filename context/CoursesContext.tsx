import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

interface CoursesContextValue {
  purchasedCourses: string[];
  loading: boolean;
  purchaseCourse: (courseId: string) => Promise<void>;
}

const CoursesContext = createContext<CoursesContextValue | null>(null);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPurchasedCourses([]);
      setLoading(false);
      return;
    }

    console.log("CoursesContext - ouvindo:", user.uid);
    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const courses = data?.purchasedCourses || [];
          setPurchasedCourses(Array.isArray(courses) ? courses : []);
          console.log("Cursos atualizados:", courses.length);
        } else {
          setPurchasedCourses([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erro no snapshot:", error);
        setPurchasedCourses([]);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user?.uid]);

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
        throw new Error(error.message || "Erro ao comprar curso");
      }
    },
    [user],
  );

  const value: CoursesContextValue = {
    purchasedCourses,
    loading,
    purchaseCourse,
  };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses deve estar dentro de CoursesProvider");
  }
  return context;
}
