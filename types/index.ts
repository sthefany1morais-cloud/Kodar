export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  purchasedCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  price: number;
  duration?: string;
}

export interface PurchasedCourse extends Course {
  progress: number;
  lastWatched: number;
}
