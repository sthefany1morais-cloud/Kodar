import React from "react";
import { render } from "@testing-library/react-native";
import { CourseLessonsScreen } from "@/components/organisms/CourseLessonsScreen";

jest.mock("@/constants/courses", () => ({
  COURSES: [
    {
      id: "1",
      title: "Test Course",
      thumbnail: "https://example.com/thumb.jpg",
      totalDuration: "10h",
      lessons: [
        { id: "l1", title: "Lesson 1", order: 1, youtubeVideoId: "test" },
      ],
    },
  ],
}));

jest.mock("@/context/CoursesContext", () => ({
  useCourses: () => ({ purchasedCourses: [] }),
}));

describe("CourseLessonsScreen", () => {
  it("renders course info correctly", () => {
    const { getByText } = render(<CourseLessonsScreen />);
    expect(getByText("Test Course")).toBeTruthy();
  });
});
