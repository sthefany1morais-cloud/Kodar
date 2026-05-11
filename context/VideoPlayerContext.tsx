import React, { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "../types";

interface VideoPlayerContextType {
  currentCourse: Course | null;
  setCurrentCourse: (course: Course | null) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(
  undefined,
);

export const VideoPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  return (
    <VideoPlayerContext.Provider value={{ currentCourse, setCurrentCourse }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error(
      "useVideoPlayer deve ser usado dentro de VideoPlayerProvider",
    );
  }
  return context;
};
