import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Course } from "../../types";

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
}

const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  margin: 16px;
  border-radius: 16px;
  padding: 20px;
  elevation: 2;
`;

const CourseImage = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const CourseTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
`;

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => (
  <Card onPress={onPress}>
    <CourseImage source={{ uri: course.image }} />
    <CourseTitle>{course.title}</CourseTitle>
  </Card>
);
