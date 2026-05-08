import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { CoursesProvider } from "../context/CoursesContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CoursesProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </CoursesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
