import { TaskMark, TaskPriority, UserSex, UserStatus } from '@/types/enum';

export const ENTITY_NAMES = {
  USER: 'user',
  COMMENT: 'comment',
  TASK: 'task',
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

export const TASK_PRIORITIES = {
  [TaskPriority.LOW]: 'Низкий',
  [TaskPriority.MEDIUM]: 'Средний',
  [TaskPriority.HIGH]: 'Высокий',
  [TaskPriority.CRITICAL]: 'Критичный',
};

export const TASK_MARKS = {
  [TaskMark.BACKEND]: 'Бэкэнд',
  [TaskMark.DESIGN]: 'Дизайн',
  [TaskMark.TEST]: 'Тестирование',
  [TaskMark.DOCUMENTATION]: 'Документация',
  [TaskMark.FRONTEND]: 'Фронтэнд',
  [TaskMark.INFRASTRUCTURE]: 'Инфраструктура',
};
