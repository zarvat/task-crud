import { UserSex, UserStatus } from '@/types/user';

export const ENTITY_NAMES = {
  USER: 'user',
};

export const USER_SEX = {
  [UserSex.MALE]: 'Мужской',
  [UserSex.FEMALE]: 'Женский',
};

export const USER_STATUSES = {
  [UserStatus.USER]: 'Пользователь',
  [UserStatus.ADMIN]: 'Администратор',
  [UserStatus.MODERATOR]: 'Модератор',
};
