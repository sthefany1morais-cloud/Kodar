import React, { useMemo } from "react";
import { FlatList, ListRenderItemInfo, View, Text } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { UserHeader } from "../../components/organisms/UserHeader";

const Container = styled(View)`
  // ← SafeAreaView → View
  flex: 1;
  background-color: #fafafa;
  padding-top: 50px; // ← Safe area manual
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #64748b;
  text-align: center;
  margin-bottom: 16px;
`;

export function MyCoursesScreen() {
  const { user } = useAuth();
  const { purchasedCourses } = useCourses();

  const myCourses = useMemo(
    () => COURSES.filter((course) => purchasedCourses.includes(course.id)),
    [purchasedCourses],
  );

  console.log("Meus Cursos:", myCourses.length);

  const renderCourseItem = ({
    item,
  }: ListRenderItemInfo<(typeof COURSES)[number]>) => (
    <CourseCard course={item} />
  );

  if (myCourses.length === 0) {
    return (
      <Container>
        <UserHeader user={user} />
        <EmptyState>
          <EmptyText>Você ainda não comprou nenhum curso</EmptyText>
          <EmptyText>Vá em "Cursos" e compre o primeiro!</EmptyText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <UserHeader user={user} />
      <FlatList
        data={myCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
}
