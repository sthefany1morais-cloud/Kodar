import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";
import { COURSES } from "../constants/courses";

interface CoursesContextValue {
  purchasedCourses: string[];
  loading: boolean;
}

const CoursesContext = createContext<CoursesContextValue | null>(null);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log("📚 CoursesContext - ouvindo:", user.uid);
    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        const courses = data?.purchasedCourses || [];
        setPurchasedCourses(courses);
        console.log("📊 Cursos atualizados:", courses.length);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return (
    <CoursesContext.Provider value={{ purchasedCourses, loading }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context)
    throw new Error("useCourses deve estar dentro de CoursesProvider");
  return context;
}
