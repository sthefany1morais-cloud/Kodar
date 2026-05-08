export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Course {
  id: string;
  title: string;
  image: string;
}
