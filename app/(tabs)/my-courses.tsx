import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, View, Text } from "react-native";
import { Linking } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { UserHeader } from "../../components/organisms/UserHeader";
import { Course } from "../../types";

const Container = styled(SafeAreaView)`
  // CORREÇÃO: Adicione os parênteses
  flex: 1;
  background-color: #fafafa;
`;

const ListContainer = styled.View`
  flex: 1;
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

export default function MyCoursesScreen() {
  const { user, logout, purchasedCourses = [] } = useAuth();
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    const filteredCourses = COURSES.filter((course) =>
      purchasedCourses.includes(course.id),
    );
    setMyCourses(filteredCourses);
  }, [purchasedCourses]);

  const renderCourseItem = ({ item }: ListRenderItemInfo<Course>) => (
    <CourseCard
      course={item}
      isPurchased={true}
      onWatch={() => {
        Linking.openURL(item.youtubeUrl);
      }}
    />
  );

  if (myCourses.length === 0) {
    return (
      <Container>
        <UserHeader user={user} onLogout={logout} />
        <EmptyState>
          <EmptyText>Você ainda não comprou nenhum curso.</EmptyText>
          <EmptyText>Confira nossa lista de cursos disponíveis!</EmptyText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <UserHeader user={user} onLogout={logout} />
      <ListContainer>
        <FlatList
          data={myCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
