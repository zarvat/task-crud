<script setup lang="ts">
import { testPredicate } from '../../typescript-tasks/2_predicate';
import { testPersonString } from '../../typescript-tasks/1_array';
import { typescriptTasksLog } from '@/utils/typescriptTasksLog';

const runPredicate = () => {
  testPredicate();
};

const runArray = () => {
  testPersonString();
};
</script>

<template>
  <main>
    <div class="container-lg container-fluid">
      <div class="buttons">
        <button class="buttons__button" @click="runArray">Обработка массива</button>
        <button class="buttons__button" @click="runPredicate">Обработка предиката</button>
      </div>
      <div class="textarea__container">
        <textarea class="textarea" v-model="typescriptTasksLog"></textarea>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
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
