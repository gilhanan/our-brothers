export interface User {
  id?: string;
  profile?: UserProfile;
  photoURL?: string;
  isAdmin?: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
}