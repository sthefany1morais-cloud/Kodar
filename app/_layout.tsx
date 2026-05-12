import { Stack } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CoursesProvider } from "@/context/CoursesContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View } from "react-native";
import { Loading } from "@/components/atoms/Loading";
import * as Notifications from "expo-notifications";

// Configurar handler de notificações (CORRIGIDO)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // ← ADICIONADO
    shouldShowList: false, // ← ADICIONADO
  }),
});

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(sobreNos)" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CoursesProvider>
          <NotificationProvider>
            <AuthGate />
          </NotificationProvider>
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

  useEffect(() => {
    if (loading || hasRedirected) return;

    console.log("AuthGate - user:", user?.email || "null", "path:", pathname);

    if (!user && pathname.startsWith("/(tabs)")) {
      console.log("Não logado em tabs → /");
      setHasRedirected(true);
      router.replace("/");
      return;
    }

    if (
      user &&
      (pathname === "/" || pathname === "/login" || pathname === "/register")
    ) {
      console.log("Logado em público → /(tabs)");
      setHasRedirected(true);
      router.replace("/(tabs)");
      return;
    }
  }, [user, loading, pathname, hasRedirected, router]);

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

  return <RootLayoutNav />;
}
