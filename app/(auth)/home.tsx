import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../context/AuthContext";
import { Course } from "../../types";
import { UserHeader } from "../../components/organisms/UserHeader";
import { CourseCard } from "../../components/molecules/CourseCard";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fafafa;
`;

const ListContainer = styled.View`
  flex: 1;
`;

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const courses: Course[] = [
    {
      id: "1",
      title: "React Native Completo",
      image:
        "https://via.placeholder.com/300x200/6366F1/FFFFFF?text=React+Native",
    },
    {
      id: "2",
      title: "Node.js & Express",
      image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Node.js",
    },
    {
      id: "3",
      title: "TypeScript Avançado",
      image:
        "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=TypeScript",
    },
  ];

  const renderCourseItem = ({ item }: ListRenderItemInfo<Course>) => (
    <CourseCard course={item} />
  );

  return (
    <Container>
      <UserHeader user={user} onLogout={logout} />
      <ListContainer>
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item: Course) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ListContainer>
    </Container>
  );
}
