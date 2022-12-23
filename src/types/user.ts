export enum UserStatus {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export interface User {
  uuid: string;
  login: string;
  password: string;
  name: string;
  avatar: string | null;
  status: UserStatus;
  age: number;
  sex: UserSex;
}
