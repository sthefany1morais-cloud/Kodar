import React from "react";
import { TouchableOpacityProps, Alert, Linking } from "react-native";
import styled from "styled-components/native";
import { Button } from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { COURSES } from "../../constants/courses";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  price: number;
  duration?: string;
}

interface CourseCardProps extends TouchableOpacityProps {
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

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { purchaseCourse, purchasedCourses } = useAuth();
  const isPurchased = purchasedCourses.includes(course.id);

  const handlePurchase = async () => {
    try {
      await purchaseCourse(course.id);
      Alert.alert("Sucesso!", "Curso comprado! Vá em 'Meus Cursos'");
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao comprar: " + error.message);
    }
  };

  const handleWatch = () => {
    Alert.alert("YouTube", `Abrir "${course.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Abrir", onPress: () => Linking.openURL(course.youtubeUrl) },
    ]);
  };

  return (
    <Card>
      <CourseThumbnail source={{ uri: course.thumbnail }} />
      <CourseTitle>{course.title}</CourseTitle>
      <CourseDuration>{course.duration}</CourseDuration>

      {isPurchased ? (
        <Button
          variant="secondary"
          size="lg"
          onPress={handleWatch}
          style={{ width: "100%" }}
        >
          🎥 Assistir Agora
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
