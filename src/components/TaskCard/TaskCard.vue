<script setup lang="ts">
import type { TaskView } from '@/types/view';
import { computed } from 'vue';
import { TASK_MARKS, TASK_PRIORITIES } from '@/constants';
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);

const emit = defineEmits(['editTask', 'closeForm']);

const editTask = () => {
  emit('editTask');
};

interface Props {
  task: TaskView;
}
const props = defineProps<Props>();
() => {
  return props;
};

const priority = computed(() => TASK_PRIORITIES[props.task.priority]);
const mark = computed(() => TASK_MARKS[props.task.mark]);

const deleteTask = async () => {
  await store.dispatch('task/deleteItem', { uuid: props.task.uuid });
  emit('closeForm');
};
</script>

<template>
  <div class="task-card">
    <div class="task-card__header text-header">Имя задачи: {{ task.title }}</div>
    <div class="task-card__footer">
      <div class="task-card__author">Приоритет: {{ priority }}</div>
      <div class="task-card__author">Метка: {{ mark }}</div>
    </div>
    <div class="task-card__body text-body">Описание задачи: {{ task.content }}</div>
    <div class="task-card__footer">
      <div class="task-card__author">Автор: {{ task.authorName }}</div>
    </div>
    <div class="task-card__footer">
      <div class="task-card__author">Исполнитель: {{ task.performerName }}</div>
      <div class="task-card__date">Дата: {{ task.date }}</div>
    </div>
    <div class="task-card__buttons">
      <button class="task-card__buttons-edit" @click="editTask">Редактировать</button>
      <button class="task-card__buttons-edit" @click="deleteTask">Удалить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-card {
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(20, 22, 43, 0.1);
  border-radius: 8px;

  @include media-breakpoint-down(lg) {
    padding: 18px 20px 18px;
  }

  @include media-breakpoint-up(lg) {
    padding: 22px 20px;
  }

  &__body {
    @include media-breakpoint-down(lg) {
      margin-top: 10px;
    }

    @include media-breakpoint-up(lg) {
      margin-top: 10px;
    }
  }

  &__header {
    @include media-breakpoint-down(lg) {
    }

    @include media-breakpoint-up(lg) {
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    @include media-breakpoint-down(lg) {
      margin-top: 10px;
    }

    @include media-breakpoint-up(lg) {
      margin-top: 10px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    @include media-breakpoint-down(lg) {
      margin-top: 10px;
    }

    @include media-breakpoint-up(lg) {
      margin-top: 10px;
    }
  }
}
</style>
