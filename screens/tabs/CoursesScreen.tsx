import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { UserHeader } from "../../components/organisms/UserHeader";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { Course } from "../../types";

const Container = styled(View)`
  flex: 1;
  background-color: #fafafa;
`;

const ListContainer = styled(View)`
  flex: 1;
`;

const HeaderSection = styled.View`
  padding: 24px 20px 16px;
  background-color: #ffffff;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
`;

export function CoursesScreen() {
  const { user } = useAuth();

  console.log("Cursos - User:", user?.email);

  const renderCourseItem = ({ item }: ListRenderItemInfo<Course>) => (
    <CourseCard course={item} />
  );

  return (
    <Container>
      <UserHeader user={user} />
      <HeaderSection>
        <SectionTitle>Explore Cursos</SectionTitle>
      </HeaderSection>
      <ListContainer>
        <FlatList
          data={COURSES}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
