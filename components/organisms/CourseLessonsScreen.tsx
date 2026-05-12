import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import styled from "styled-components/native";
import { COURSES } from "../../constants/courses";
import { VideoPlayer } from "../organisms/VideoPlayer";
import { LessonCard } from "../molecules/LessonCard";
import { Button } from "../atoms/Button";
import { useCourses } from "../../context/CoursesContext";
import { Course } from "../../types";

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
`;

const Header = styled.View`
  padding: 24px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e2e8f0;
`;

const CourseTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const CourseInfo = styled.Text`
  font-size: 16px;
  color: #64748b;
`;

const LessonsContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const LessonsTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

export function CourseLessonsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { purchasedCourses } = useCourses();

  const course = COURSES.find((c) => c.id === id) as Course;
  const [showVideo, setShowVideo] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const isPurchased = purchasedCourses.includes(course.id);

  if (!course) {
    router.back();
    return null;
  }

  const handlePlayLesson = (lessonId: string) => {
    if (!isPurchased) {
      return;
    }
    setCurrentLessonId(lessonId);
    setShowVideo(true);
  };

  const currentLesson = course.lessons.find((l) => l.id === currentLessonId);

  return (
    <Container>
      <Header>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseInfo>
          {course.totalDuration} • {course.lessons.length} aulas
        </CourseInfo>

        {!isPurchased && (
          <Button
            variant="primary"
            style={{ marginTop: 16, width: "100%" }}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            Comprar para acessar
          </Button>
        )}
      </Header>

      <LessonsContainer>
        <LessonsTitle>Aulas</LessonsTitle>
        <FlatList
          data={course.lessons.sort((a, b) => a.order - b.order)}
          renderItem={({ item: lesson }) => (
            <LessonCard
              lesson={lesson}
              courseThumbnail={course.thumbnail}
              isPurchased={isPurchased}
              onPlay={() => handlePlayLesson(lesson.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </LessonsContainer>

      {showVideo && currentLesson && (
        <VideoPlayer
          videoId={currentLesson.youtubeVideoId}
          title={`${course.title} - ${currentLesson.title}`}
          visible={showVideo}
          onClose={() => setShowVideo(false)}
        />
      )}
    </Container>
  );
}
