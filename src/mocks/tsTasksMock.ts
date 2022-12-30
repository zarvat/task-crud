export const testArrayForSort = [
  [
    { name: 'Егор', age: 2 },
    { name: 'КАТЕРИнА', age: 4 },
    { name: 'Вилка', age: 54 },
    { name: 'олеся', age: 77 },
    { name: 'оЛЕГ', age: 21 },
    { name: 'иГнат', age: 89 },
    { name: '1341234', age: 78 },
    { name: 'Богдан', age: 19 },
    { name: 'владимир', age: 41 },
    { name: 'ЯКОВ', age: 19 },
  ],
  [{ name: 'ЯКОВ', age: 19.6 }],
  [
    { name: 'TTT', age: 0 },
    { name: 'TTT', age: 4 },
    { name: 'TTT', age: 9 },
  ],
];

export const testArrayForPredicate = [
  {
    predicate: () => {
      return new Promise((resolve) => setTimeout(() => resolve(true), 500));
    },
    timeout: 1000,
  },
  {
    predicate: () => {
      return new Promise((resolve) => setTimeout(() => resolve(true), 7000));
    },
    timeout: 5000,
  },
  {
    predicate: () => {
      return new Promise((resolve) => setTimeout(() => resolve(true), 3000));
    },
    timeout: 5000,
  },
];
