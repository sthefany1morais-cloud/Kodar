import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { Course } from "../../types";
import { Button } from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { COURSES } from "../../constants/courses";
import { router } from "expo-router";
import { Linking } from "react-native";

interface CourseCardProps extends TouchableOpacityProps {
  course: Course;
  isPurchased?: boolean;
  onWatch?: () => void;
}

const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  margin: 16px;
  border-radius: 16px;
  padding: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
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

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isPurchased = false,
  onWatch,
  ...props
}) => {
  const { user, purchaseCourse } = useAuth();

  const handlePurchase = async () => {
    try {
      await purchaseCourse(course.id);
    } catch (error: any) {
      alert("Erro ao comprar curso: " + error.message);
    }
  };

  const handleWatch = () => {
    if (onWatch) {
      onWatch();
    } else {
      Linking.openURL(course.youtubeUrl);
    }
  };

  return (
    <Card {...props}>
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
          Assistir Agora
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
