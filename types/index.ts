export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  purchasedCourses: string[];
}
export interface Lesson {
  id: string;
  title: string;
  youtubeVideoId: string;
  duration?: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  playlistId: string;
  price: number;
  totalDuration?: string;
  lessons: Lesson[];
}

export interface PurchasedCourse extends Course {
  progress: number;
  lastWatchedLessonId: string;
}
