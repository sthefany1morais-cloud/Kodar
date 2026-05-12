import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import styled from "styled-components/native";
import { COURSES } from "@/constants/courses";
import { VideoPlayer } from "@/components/organisms/VideoPlayer";
import { LessonCard } from "@/components/molecules/LessonCard";
import { Button } from "@/components/atoms/Button";
import { useCourses } from "@/context/CoursesContext";
import { useAuth } from "@/context/AuthContext";
import { UserHeader } from "@/components/organisms/UserHeader";
import { Course, Lesson } from "@/types";

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

const BackButton = styled(Button)`
  margin-bottom: 16px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #ef4444;
  text-align: center;
  margin: 20px;
`;

export default function CourseLessonsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { purchasedCourses } = useCourses();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const isPurchased = course ? purchasedCourses.includes(course.id) : false;

  useEffect(() => {
    if (!id) return;

    const foundCourse = COURSES.find((c) => c.id === id);
    setCourse(foundCourse || null);
  }, [id]);

  if (!course) {
    return (
      <Container>
        <ErrorText>Curso não encontrado</ErrorText>
        <BackButton
          variant="outline"
          size="sm"
          onPress={() => router.back()}
          style={{ width: 200, alignSelf: "center" }}
        >
          Voltar
        </BackButton>
      </Container>
    );
  }

  const handlePlayLesson = (lessonId: string) => {
    if (!isPurchased) {
      Alert.alert(
        "Curso não comprado",
        "Compre o curso para assistir às aulas!",
        [{ text: "OK" }],
      );
      return;
    }

    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      setShowVideo(true);
    }
  };

  return (
    <Container>
      <UserHeader user={user} />

      <Header>
        <BackButton variant="outline" size="sm" onPress={() => router.back()}>
          ← Voltar
        </BackButton>

        <CourseTitle>{course.title}</CourseTitle>
        <CourseInfo>
          {course.totalDuration} • {course.lessons.length} aulas
        </CourseInfo>

        {!isPurchased && (
          <Button
            variant="primary"
            style={{ marginTop: 16, width: "100%" }}
            onPress={() => router.push("/(tabs)")}
          >
            Comprar por R$ {course.price.toFixed(2)}
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
          onClose={() => {
            setShowVideo(false);
            setCurrentLesson(null);
          }}
        />
      )}
    </Container>
  );
}
