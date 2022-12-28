import { typescriptTasksLog } from '@/utils/typescriptTasksLog';

interface Person {
  name: string;
  age: number;
}

const checkIsAllPersonsValid = (persons: Person[]): boolean => {
  return !persons.some((person) => !Number.isInteger(person.age) || person.age < 0);
};
const getPersonString = (persons: Person[]): string => {
  const isValidPersonArray = checkIsAllPersonsValid(persons);
  if (!isValidPersonArray) {
    return 'В массиве объектов есть элементы с невалидным возрастом';
  }
  return persons
    .filter((person) => person.age > 18)
    .sort((a, b) => a.age - b.age)
    .map(({ name, age }) => `${name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)} ${age}`)
    .join(', ');
};

const testArray: Person[][] = [
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

export const testPersonString = () => {
  typescriptTasksLog.value = '';
  for (let i = 0; i < testArray.length; i++) {
    const persons = testArray[i];
    const output = getPersonString(persons);
    const log = `Output ${i} = ${output || 'Нет подходящих по условию элементов'}`;
    typescriptTasksLog.value += `${log} \n`;
    console.log(log);
  }
  typescriptTasksLog.value += '\n DONE';
};

// testPersonString();
