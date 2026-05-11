import React from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../../components/atoms/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

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

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  margin-top: 32px;
`;

const SectionSubtitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #64748b;
  margin-bottom: 24px;
`;

const FeatureList = styled.View`
  gap: 16px;
  margin-bottom: 32px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const FeatureIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #6366f1;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: #1e293b;
  flex: 1;
`;

const ButtonsContainer = styled(View)`
  gap: 16px;
  margin-top: 32px;
`;

export default function SobreNosScreen() {
  return (
    <Container>
      <Content>
        <Logo>Kodar</Logo>

        <SectionTitle>Sobre o Kodar</SectionTitle>
        <Description>
          Kodar é a plataforma de aprendizado de programação mais completa do
          mercado brasileiro. Nossa missão é democratizar o acesso à educação
          tecnológica de qualidade, oferecendo cursos práticos e atualizados
          para todos os níveis.
        </Description>

        <SectionSubtitle>Por que escolher o Kodar?</SectionSubtitle>

        <FeatureList>
          <FeatureItem>
            <FeatureIcon>
              <FontAwesome name="book" size={20} color="#fff" />
            </FeatureIcon>
            <FeatureText>Cursos completos do básico ao avançado</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FontAwesome name="play-circle" size={20} color="#fff" />
            </FeatureIcon>
            <FeatureText>Aulas práticas com projetos reais</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FontAwesome name="clock-o" size={20} color="#fff" />
            </FeatureIcon>
            <FeatureText>Seu ritmo - aprenda quando e onde quiser</FeatureText>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FontAwesome name="graduation-cap" size={20} color="#fff" />
            </FeatureIcon>
            <FeatureText>Certificados reconhecidos pelo mercado</FeatureText>
          </FeatureItem>
        </FeatureList>

        <ButtonsContainer>
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push("/login")}
          >
            Começar Agora
          </Button>
          <Button variant="outline" size="lg" onPress={() => router.back()}>
            Voltar
          </Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
}
