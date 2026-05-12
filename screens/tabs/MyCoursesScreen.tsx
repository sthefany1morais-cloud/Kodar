import React, { useMemo } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { UserHeader } from "../../components/organisms/UserHeader";
import { Course } from "../../types";

const Container = styled(View)`
  flex: 1;
  background-color: #fafafa;
`;

const ListContainer = styled(View)`
  flex: 1;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const EmptyTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 8px;
`;

const EmptySubtitle = styled.Text`
  font-size: 16px;
  color: #64748b;
  text-align: center;
  line-height: 22px;
`;

export function MyCoursesScreen() {
  const { user } = useAuth();
  const { purchasedCourses } = useCourses();

  const myCourses = useMemo(
    () => COURSES.filter((course) => purchasedCourses.includes(course.id)),
    [purchasedCourses],
  );

  console.log("Meus Cursos:", myCourses.length);

  const renderCourseItem = ({ item }: ListRenderItemInfo<Course>) => (
    <CourseCard course={item} />
  );

  if (myCourses.length === 0) {
    return (
      <Container>
        <UserHeader user={user} />
        <EmptyState>
          <EmptyTitle>Nenhum curso comprado</EmptyTitle>
          <EmptySubtitle>
            Comece sua jornada de aprendizado comprando seu primeiro curso na
            aba "Cursos"
          </EmptySubtitle>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <UserHeader user={user} />
      <ListContainer>
        <FlatList
          data={myCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
