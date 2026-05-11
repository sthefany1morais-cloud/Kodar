import React, { useState } from "react";
import { ScrollView, View } from "react-native";
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

export function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signup(email, password);
      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
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
          <Subtitle>Crie sua conta gratuita</Subtitle>
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

        <Input
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          variant="primary"
          size="lg"
          onPress={handleRegister}
          disabled={loading || !email || !password || !confirmPassword}
          style={{ marginTop: 16 }}
        >
          Criar Conta
        </Button>

        <AuthButtons>
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.back()}
            disabled={loading}
          >
            Já tenho conta
          </Button>
        </AuthButtons>
      </Content>
    </Container>
  );
}
