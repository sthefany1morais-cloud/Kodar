import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { CourseCard } from "../../components/molecules/CourseCard";
import { UserHeader } from "../../components/organisms/UserHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fafafa;
`;

const ListContainer = styled.View`
  flex: 1;
`;

export default function CoursesScreen() {
  const { user, logout, purchasedCourses } = useAuth();

  const renderCourseItem = ({
    item,
  }: ListRenderItemInfo<(typeof COURSES)[number]>) => (
    <CourseCard
      course={item}
      isPurchased={purchasedCourses?.includes(item.id) || false}
    />
  );

  return (
    <Container>
      <UserHeader user={user} onLogout={logout} />
      <ListContainer>
        <FlatList
          data={COURSES}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
}
