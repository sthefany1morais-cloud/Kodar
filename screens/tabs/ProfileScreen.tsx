import React from "react";
import { ScrollView, Alert, View } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { FontAwesome } from "@expo/vector-icons";
import { COURSES } from "../../constants/courses";

const Container = styled(View)`
  flex: 1;
  background-color: #fafafa;
  padding-top: 50px;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: 24px;
`;

const ProfileCard = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  elevation: 2;
`;

const ProfileTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const ProfileInfo = styled.Text`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 8px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  gap: 24px;
  margin-top: 24px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #6366f1;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: #64748b;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: #ef4444;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 24px;
`;

const LogoutText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const { purchasedCourses } = useCourses();

  const totalSpent = COURSES.filter((course) =>
    purchasedCourses.includes(course.id),
  ).reduce((total, course) => total + course.price, 0);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error) {
            console.error("Erro no logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <Container>
      <Content>
        <ProfileCard>
          <ProfileTitle>Meu Perfil</ProfileTitle>

          <ProfileInfo>
            <FontAwesome name="user" size={20} color="#6366f1" />{" "}
            {user?.displayName || user?.email || "Usuário"}
          </ProfileInfo>

          <ProfileInfo>
            <FontAwesome name="envelope" size={20} color="#6366f1" />{" "}
            {user?.email}
          </ProfileInfo>

          <StatsContainer>
            <StatItem>
              <StatNumber>{purchasedCourses.length}</StatNumber>
              <StatLabel>Cursos</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>R$ {totalSpent.toFixed(1)}</StatNumber>
              <StatLabel>Gasto</StatLabel>
            </StatItem>
          </StatsContainer>
        </ProfileCard>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>
            <FontAwesome name="sign-out" size={18} color="#ffffff" /> Sair da
            conta
          </LogoutText>
        </LogoutButton>
      </Content>
    </Container>
  );
}
