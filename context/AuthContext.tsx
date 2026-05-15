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
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  biometricLogin: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  biometryAvailable: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [biometryAvailable, setBiometryAvailable] = useState(false);

  const checkBiometry = useCallback(async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const supported = await LocalAuthentication.isEnrolledAsync();
      const available = compatible && supported;
      setBiometryAvailable(available);
      console.log("Biometria disponível:", available);
    } catch (error) {
      console.error("Erro ao verificar biometria:", error);
      setBiometryAvailable(false);
    }
  }, []);

  useEffect(() => {
    console.log("AuthProvider inicializando...");

    checkBiometry();

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
  }, [checkBiometry]);

  const saveCredentials = async (email: string, password: string) => {
    try {
      await SecureStore.setItemAsync(
        "userCredentials",
        JSON.stringify({ email: email.trim(), password }),
      );
      console.log("Credenciais salvas com segurança");
    } catch (error) {
      console.error("Erro ao salvar credenciais:", error);
    }
  };

  const getSavedCredentials = async () => {
    try {
      const data = await SecureStore.getItemAsync("userCredentials");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Erro ao recuperar credenciais:", error);
      return null;
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email.trim(), password);

    await saveCredentials(email, password);
  }, []);

  const biometricLogin = useCallback(async () => {
    try {
      if (!biometryAvailable) {
        throw new Error("Biometria não disponível neste dispositivo");
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentique-se para acessar sua conta",
        cancelLabel: "Cancelar",
        disableDeviceFallback: true,
      });

      if (!result.success) {
        throw new Error("Autenticação biométrica cancelada ou falhou");
      }

      const savedCredentials = await getSavedCredentials();

      if (!savedCredentials?.email || !savedCredentials?.password) {
        throw new Error(
          "Credenciais não encontradas. Faça login manual primeiro.",
        );
      }

      await login(savedCredentials.email, savedCredentials.password);
    } catch (error: any) {
      console.error("Erro no login biométrico:", error);
      throw new Error(error.message || "Erro na autenticação biométrica");
    }
  }, [login, biometryAvailable]);

  const signup = useCallback(async (email: string, password: string) => {
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    await createUserWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const logout = useCallback(async () => {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);

    await SecureStore.deleteItemAsync("userCredentials");
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login,
    biometricLogin,
    signup,
    logout,
    biometryAvailable,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro de AuthProvider");
  return context;
}
