import React, { useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { Loading } from "../components/atoms/Loading";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, user, loading: authLoading } = useAuth();

  console.log(
    "LoginScreen - authLoading:",
    authLoading,
    "user:",
    user?.email,
  );

  const handleLogin = async () => {
    console.log("Tentando login com:", email);

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Chamando login do AuthContext...");
      await login(email, password);
      console.log("Login bem-sucedido! Redirecionando...");

      router.push("/(auth)/home");
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login");
      Alert.alert("Erro", err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    console.log("LoginScreen mostrando loading do AuthContext");
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
          disabled={loading || authLoading || !email || !password}
          style={{ marginTop: 16 }}
        >
          Entrar
        </Button>

        <AuthButtons>
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.push("/register")}
            disabled={loading || authLoading}
          >
            Criar conta
          </Button>
        </AuthButtons>
      </Content>
    </Container>
  );
}
