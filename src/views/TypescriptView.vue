<script setup lang="ts">
import NavigationTab from '@/components/NavigationTab/NavigationTab.vue';
import { ref } from 'vue';
import { getPersonString, Person } from '../../typescript-tasks/1_array';
import { predicateCheckerTime, PredicateWithTimeout } from '../../typescript-tasks/2_predicate';
import { testArrayForPredicate, testArrayForSort } from '@/mocks/tsTasksMock';

const typescriptTasksLog = ref('');

const testPersonString = (testArray: Person[][]) => {
  typescriptTasksLog.value = '';
  for (let i = 0; i < testArray.length; i++) {
    const persons = testArray[i];
    try {
      const output = getPersonString(persons);
      const log = `Output ${i} = ${output || 'Нет подходящих по условию элементов'}`;
      typescriptTasksLog.value += `${log} \n`;
      console.log(log);
    } catch (error) {
      typescriptTasksLog.value += `${error} \n`;
      console.log(error);
    }
  }
  typescriptTasksLog.value += '\n DONE';
};

const testPredicate = async (testArray: PredicateWithTimeout[]) => {
  typescriptTasksLog.value = '';
  for (let i = 0; i < testArray.length; i++) {
    const predicateWithTimeout = testArray[i];
    await predicateCheckerTime(predicateWithTimeout)
      .then((r) => {
        const log = `Output ${i} = ${r} ms`;
        typescriptTasksLog.value += `${log} \n`;
        console.log(log);
      })
      .catch((e) => {
        const log = `Output ${i} = ${e}`;
        typescriptTasksLog.value += `${log} \n`;
        console.log(log);
      });
  }
  typescriptTasksLog.value += '\n DONE';
};
</script>

<template>
  <navigation-tab></navigation-tab>
  <header class="header d-flex align-items-center justify-content-center">
    <h1 class="container-lg container-fluid">Тестовый интерфейс для TS #1 & #2</h1>
  </header>
  <main>
    <div class="container-lg container-fluid">
      <div class="buttons">
        <button class="buttons__button" @click="testPersonString(testArrayForSort)">
          Обработка массива
        </button>
        <button class="buttons__button" @click="testPredicate(testArrayForPredicate)">
          Обработка предиката
        </button>
      </div>
      <div class="textarea__container">
        <textarea class="textarea" v-model="typescriptTasksLog"></textarea>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.header {
  background: #f9f9f9;
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;

  @include media-breakpoint-down(lg) {
    height: 100px;
  }

  @include media-breakpoint-up(lg) {
    height: 200px;
  }
}

.buttons {
  margin: 200px auto auto;
  background: #f9f9f9;
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.1);
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  @include media-breakpoint-down(lg) {
    height: 100px;
  }

  @include media-breakpoint-up(lg) {
    height: 100px;
  }

  &__button {
    height: 100%;
    flex-grow: 1;
  }
}
.textarea {
  background: #f9f9f9;
  box-shadow: 5px -5px 10px rgba(0, 0, 0, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;

  &__container {
    margin: 20px auto auto;
    width: 50%;
    height: 300px;
  }
}
</style>
