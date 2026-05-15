import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert, Platform } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../../components/atoms/Button";
import { Input } from "../../components/atoms/Input";
import { Loading } from "../../components/atoms/Loading";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fafafa;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 32px;
`;

const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: 48px;
`;

const Logo = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 18px;
  color: #1e293b;
  text-align: center;
  margin-bottom: 48px;
`;

const AuthButtons = styled(View)`
  margin-top: 24px;
  gap: 16px;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BiometryButton = styled(Button)`
  flex-direction: row;
  gap: 12px;
  background-color: ${({ disabled }) => (disabled ? "#9CA3AF" : "#10B981")};
`;

const BiometryIcon = styled(Icon)`
  font-size: 24px;
`;

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, login, biometricLogin, biometryAvailable } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("Já logado, redirecionando...");
      router.replace("/(tabs)");
    }
  }, [user]);

  const handleLogin = async () => {
    console.log("Login com:", email);

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email, password);
      console.log("Login OK - redirecionando...");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Erro ao fazer login");
      Alert.alert("Erro", err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!biometryAvailable) {
      Alert.alert("Biometria", "Biometria não disponível neste dispositivo");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await biometricLogin();
    } catch (err: any) {
      console.error("Biometric login error:", err);
      setError(err.message || "Erro no login biométrico");
      Alert.alert("Erro", err.message || "Erro no login biométrico");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo>Kodar</Logo>
          <Subtitle>Faça login na sua conta</Subtitle>
        </LogoContainer>

        {/* Botão de Biometria */}
        {biometryAvailable && Platform.OS !== "web" && (
          <BiometryButton
            variant="primary"
            size="lg"
            onPress={handleBiometricLogin}
            disabled={loading}
            style={{ marginBottom: 24 }}
          >
            <BiometryIcon name="fingerprint" color="#FFFFFF" />
            Entrar com biometria
          </BiometryButton>
        )}

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          variant="primary"
          size="lg"
          onPress={handleLogin}
          disabled={loading || !email || !password}
          style={{ marginTop: 16 }}
        >
          Entrar
        </Button>

        <AuthButtons>
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.push("/register")}
            disabled={loading}
          >
            Criar conta
          </Button>
        </AuthButtons>
      </Content>
    </Container>
  );
}
