import { UserSex, UserStatus } from '@/types/enum';

export const ENTITY_NAMES = {
  USER: 'user',
  COMMENT: 'comment',
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
