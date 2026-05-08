import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { View } from "react-native";
import { Loading } from "../../components/atoms/Loading";

export default function AuthLayout() {
  const { user, loading } = useAuth();

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

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
