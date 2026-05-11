import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { UserHeader } from "../../components/organisms/UserHeader";
import { useAuth } from "../../context/AuthContext";

const Container = styled(View)`
  flex: 1;
  background-color: #fafafa;
  padding-top: 50px;
`;

const ListContainer = styled(View)`
  flex: 1;
`;

export function CoursesScreen() {
  const { user } = useAuth();

  console.log("Cursos - User:", user?.email);

  const renderCourseItem = ({
    item,
  }: ListRenderItemInfo<(typeof COURSES)[number]>) => (
    <CourseCard course={item} />
  );

  return (
    <Container>
      <UserHeader user={user} />
      <ListContainer>
        <FlatList
          data={COURSES}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      </ListContainer>
    </Container>
  );
}
