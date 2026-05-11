import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { CoursesProvider } from "../context/CoursesContext";
import { useEffect, useState } from "react";
import { Redirect, usePathname, useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View } from "react-native";
import { Loading } from "../components/atoms/Loading";

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(sobreNos)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CoursesProvider>
          <AuthGate />
        </CoursesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Evita múltiplos redirecionamentos
  useEffect(() => {
    if (loading || hasRedirected) return;

    console.log(
      "🔐 AuthGate - user:",
      user?.email || "null",
      "path:",
      pathname,
    );

    // SE NÃO ESTÁ LOGADO e está em rota PROTEGIDA (tabs)
    if (!user && pathname.startsWith("/(tabs)")) {
      console.log("🚫 Não logado em tabs → /");
      setHasRedirected(true);
      router.replace("/");
      return;
    }

    // SE ESTÁ LOGADO e está em tela pública
    if (
      user &&
      (pathname === "/" || pathname === "/login" || pathname === "/register")
    ) {
      console.log("✅ Logado em público → /(tabs)");
      setHasRedirected(true);
      router.replace("/(tabs)");
      return;
    }
  }, [user, pathname, loading, hasRedirected, router]);

  // Loading
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Loading />
      </View>
    );
  }

  // Renderiza navegação normal
  return <RootLayoutNav />;
}
