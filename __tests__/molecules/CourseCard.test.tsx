import React from "react";
import { render } from "@testing-library/react-native";
import { CourseCard } from "@/components/molecules/CourseCard";
import { Course } from "@/types";

const mockCourse: Course = {
  id: "1",
  title: "Test Course",
  thumbnail: "https://example.com/thumb.jpg",
  playlistId: "playlist123", // ← ADICIONADO (obrigatório)
  totalDuration: "10h",
  lessons: [
    {
      id: "l1",
      title: "Lesson 1",
      youtubeVideoId: "video123", // ← ADICIONADO (obrigatório)
      order: 1, // ← ADICIONADO (obrigatório)
    },
  ],
  price: 99.99,
};

jest.mock("@/context/CoursesContext", () => ({
  useCourses: () => ({
    purchaseCourse: jest.fn(),
    purchasedCourses: [],
  }),
}));

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("CourseCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders course info correctly", () => {
    const { getByText } = render(<CourseCard course={mockCourse} />);
    expect(getByText("Test Course")).toBeTruthy();
    expect(getByText("10h")).toBeTruthy();
  });
});
