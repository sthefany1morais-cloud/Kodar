import React from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../components/atoms/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fafafa;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 32px;
`;

const Logo = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #6366f1;
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #64748b;
  margin-bottom: 32px;
`;

const ButtonsContainer = styled(View)`
  gap: 16px;
`;

export default function Index() {
  return (
    <Container>
      <Content>
        <Logo>Kodar</Logo>
        <Title>Bem-vindo ao Kodar!</Title>
        <Description>
          Kodar é a plataforma de aprendizado de programação mais completa do
          mercado. Com cursos práticos e atualizados, você aprende do básico ao
          avançado em sua própria velocidade.
        </Description>

        <ButtonsContainer>
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push("/login")}
          >
            Começar Agora
          </Button>
          <Button variant="outline" size="lg">
            Saiba Mais
          </Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
}
