<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { TaskView } from '@/types/view';
import { store } from '@/store';
import { TaskMark, TaskPriority } from '@/types/enum';
import { TASK_MARKS, TASK_PRIORITIES } from '@/constants';

const emit = defineEmits(['closeForm']);

const onReset = () => {
  emit('closeForm');
};

const task = computed<TaskView>(() => store.getters['task/getTask']);

const taskID = computed<string>(() => task.value.uuid);

const marks = computed(() => {
  return Object.keys(TaskMark).map((value: TaskMark) => {
    return { label: TASK_MARKS[value], value };
  });
});

const priorities = computed(() => {
  return Object.keys(TaskPriority).map((value: TaskPriority) => {
    return { label: TASK_PRIORITIES[value], value };
  });
});

const titleValue = computed<string>({
  get() {
    return task.value.title;
  },
  set(value: string) {
    store.commit('task/getItem', { ...task.value, title: value });
  },
});

const contentValue = computed<string>({
  get() {
    return task.value.content;
  },
  set(value: string) {
    store.commit('task/getItem', { ...task.value, content: value });
  },
});

const markValue = computed<TaskMark>({
  get() {
    return task.value.mark;
  },
  set(value: TaskMark) {
    store.commit('task/getItem', { ...task.value, mark: value });
  },
});

const priorityValue = computed<TaskPriority>({
  get() {
    return task.value.priority;
  },
  set(value: TaskPriority) {
    store.commit('task/getItem', { ...task.value, priority: value });
  },
});

const deleteTask = async () => {
  emit('closeForm');
  await store.dispatch('task/deleteItem', { uuid: taskID.value });
};

const onSubmit = async () => {
  if (task.value.uuid.length) {
    await store.dispatch('task/updateItem', task.value);
  } else {
    await store.dispatch('task/createItem', task.value);
  }
  emit('closeForm');
};
</script>

<template>
  <main>
    <form class="comment-form" @submit.prevent="onSubmit" @reset="onReset">
      <div class="comment-form__control">
        <div class="comment-form__control-label">Имя задачи</div>
        <input v-model="titleValue" class="form-input" name="title" />
      </div>
      <div class="comment-form__control">
        <div class="comment-form__control-label">Описание</div>
        <textarea type="text" v-model="contentValue" class="form-input" name="content" />
      </div>
      <div class="comment-form__control">
        <div class="comment-form__control-label">Приоритет</div>
        {{ priorities }}
        <select v-model="priorityValue" class="form-input" name="content">
          <option v-for="priority in priorities" :value="priority.value" :key="priority">
            {{ priority.label }}
          </option>
        </select>
      </div>
      <div class="comment-form__control">
        <div class="comment-form__control-label">Метка</div>
        <select v-model="markValue" class="form-input" name="content">
          <option v-for="mark in marks" :value="mark.value" :key="mark">{{ mark.label }}</option>
        </select>
      </div>
      <button type="submit">
        {{ taskID.length ? 'Редактировать задачу' : 'Создать задачу' }}
      </button>
      <button v-if="taskID.length" @click="deleteTask">Удалить задачу</button>
      <button type="reset">Отмена</button>
    </form>
  </main>
</template>

<style scoped lang="scss">
.comment-form {
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(20, 22, 43, 0.1);
  border-radius: 8px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  gap: 15px;

  @include media-breakpoint-down(lg) {
    padding: 18px 20px 18px;
  }

  @include media-breakpoint-up(lg) {
    padding: 22px 20px;
  }
}
</style>
