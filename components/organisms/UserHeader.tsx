import React from "react";
import { Image, Alert } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types";

const Header = styled.View`
  padding: 32px 24px;
  background-color: #6366f1;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
`;

const WelcomeText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  flex: 1;
`;

export const UserHeader: React.FC<{ user: User | null }> = ({ user }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/"); // ✅ Vai para index geral (tela inicial)
          } catch (error) {
            console.error("Erro no logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <Header>
      <UserInfo>
        <Avatar
          source={{
            uri:
              user?.photoURL ||
              "https://via.placeholder.com/48/6366F1/FFFFFF?text=KD",
          }}
        />
        <WelcomeText>
          Olá, {user?.displayName?.split(" ")[0] || user?.email}
        </WelcomeText>
        <Button variant="outline" size="sm" onPress={handleLogout}>
          Sair
        </Button>
      </UserInfo>
    </Header>
  );
};
