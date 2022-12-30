export interface Person {
  name: string;
  age: number;
}

export const getPersonString = (persons: Person[]): string => {
  const isValidPersonArray = persons.every(
    (person) => Number.isInteger(person.age) || person.age < 0
  );
  if (!isValidPersonArray) {
    throw new Error('В массиве объектов есть элементы с невалидным возрастом');
  }
  return persons
    .filter((person) => person.age > 18)
    .sort((a, b) => a.age - b.age)
    .map(({ name, age }) => `${name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)} ${age}`)
    .join(', ');
};
