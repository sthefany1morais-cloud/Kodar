import { Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  // Redireciona sempre pras tabs se logado
  return <Redirect href="/(tabs)" />;
}
