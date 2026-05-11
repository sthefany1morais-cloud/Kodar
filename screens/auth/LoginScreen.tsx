import React, { useState, useEffect } from "react";
import { ScrollView, View, Alert } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../../components/atoms/Button";
import { Input } from "../../components/atoms/Input";
import { Loading } from "../../components/atoms/Loading";
import { useAuth } from "../../context/AuthContext";
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

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, login } = useAuth();

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
