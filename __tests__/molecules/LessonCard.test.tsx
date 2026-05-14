import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { LessonCard } from "@/components/molecules/LessonCard";
import { Lesson } from "@/types";

const mockLesson: Lesson = {
  id: "1",
  title: "Test Lesson",
  youtubeVideoId: "abc123", // ← ADICIONADO (obrigatório)
  duration: "10:30",
  order: 1, // ← ADICIONADO (obrigatório)
};

const defaultProps = {
  lesson: mockLesson,
  courseThumbnail: "https://example.com/thumb.jpg",
  isPurchased: true,
  onPlay: jest.fn(),
};

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("LessonCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders lesson info correctly", () => {
    const { getByText } = render(<LessonCard {...defaultProps} />);
    expect(getByText("Test Lesson")).toBeTruthy();
  });

  it("shows play button when purchased", () => {
    const { getByText } = render(<LessonCard {...defaultProps} />);
    expect(getByText("▶")).toBeTruthy();
  });
});
