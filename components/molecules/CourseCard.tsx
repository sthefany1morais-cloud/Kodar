import React from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Image } from "react-native";
import { Button } from "../atoms/Button";
import { useCourses } from "../../context/CoursesContext";
import { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  margin: 16px;
  border-radius: 16px;
  padding: 20px;
  elevation: 2;
`;

const CourseThumbnail = styled.Image`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const CourseTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const CourseDuration = styled.Text`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
`;

const PriceTag = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 16px;
`;

const LessonsCount = styled.Text`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
`;

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { purchaseCourse, purchasedCourses } = useCourses();
  const isPurchased = purchasedCourses.includes(course.id);

  const handlePurchase = async () => {
    try {
      await purchaseCourse(course.id);
      Alert.alert("Sucesso!", "Curso comprado! Acesse 'Meus Cursos'");
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao comprar: " + error.message);
    }
  };

  const handleOpenCourse = () => {
    if (isPurchased) {
      router.push(`/(tabs)/my-courses`);
    } else {
      Alert.alert(
        "Curso não comprado",
        "Compre o curso para acessar as aulas!",
      );
    }
  };

  return (
    <Card onPress={handleOpenCourse}>
      <CourseThumbnail source={{ uri: course.thumbnail }} />
      <CourseTitle>{course.title}</CourseTitle>
      <CourseDuration>{course.totalDuration}</CourseDuration>
      <LessonsCount>{course.lessons.length} aulas</LessonsCount>

      {isPurchased ? (
        <Button variant="secondary" size="lg" style={{ width: "100%" }}>
          Ver Aulas
        </Button>
      ) : (
        <>
          <PriceTag>R$ {course.price.toFixed(2)}</PriceTag>
          <Button
            variant="primary"
            size="lg"
            onPress={handlePurchase}
            style={{ width: "100%" }}
          >
            Comprar Curso
          </Button>
        </>
      )}
    </Card>
  );
};
