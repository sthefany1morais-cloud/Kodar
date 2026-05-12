import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Lesson } from "../../types";

interface LessonCardProps {
  lesson: Lesson;
  courseThumbnail: string;
  isPurchased: boolean;
  onPlay: () => void;
}

const Card = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex-direction: row;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 16px;
  elevation: 1;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const Thumbnail = styled.Image`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const LessonInfo = styled.View`
  flex: 1;
`;

const LessonTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const LessonDuration = styled.Text`
  font-size: 14px;
  color: #64748b;
`;

const PlayButton = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #6366f1;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

const PlayIcon = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  courseThumbnail,
  isPurchased,
  onPlay,
}) => {
  const handlePress = () => {
    if (isPurchased) {
      onPlay();
    } else {
      Alert.alert(
        "Curso não comprado",
        "Compre o curso para assistir às aulas!",
      );
    }
  };

  return (
    <Card onPress={handlePress} disabled={!isPurchased}>
      <Thumbnail source={{ uri: courseThumbnail }} />
      <LessonInfo>
        <LessonTitle>{lesson.title}</LessonTitle>
        {lesson.duration && <LessonDuration>{lesson.duration}</LessonDuration>}
      </LessonInfo>
      {isPurchased && (
        <PlayButton>
          <PlayIcon>▶</PlayIcon>
        </PlayButton>
      )}
    </Card>
  );
};
