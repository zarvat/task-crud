<script setup lang="ts">
import { useStore } from 'vuex';
import { key } from '@/store';
import TaskForm from '@/components/TaskForm/TaskForm.vue';
import type { Pagination } from '@/store/types/params';
import AddTaskCard from '@/components/TaskCard/AddTaskCard.vue';
import { computed, onMounted, ref } from 'vue';
import TaskCard from '@/components/TaskCard/TaskCard.vue';
import type { TaskView } from '@/types/view';
const store = useStore(key);

const editedTaskID = ref('');

const taskWall = computed(() => store.getters['task/getPage']);

onMounted(async () => {
  await store.dispatch('user/getAll');
});

const initialPagination: Pagination = {
  filter: [],
  offset: 0,
  limit: Infinity,
};
store.dispatch('task/setPagination', initialPagination);

const editTaskChange = async (task: TaskView | null) => {
  if (editedTaskID.value.length) {
    alert('Закончите редактирование|добавление другой задачи!');
    return;
  }

  if (task) {
    await store.dispatch('task/getItem', { uuid: task.uuid });
    editedTaskID.value = task.uuid;
    return;
  }
  await store.dispatch('task/resetItem');
  editedTaskID.value = 'new';
};
</script>

<template>
  <main>
    <header class="header">
      <div class="container-lg container-fluid">
        <div class="todo">Стена задач</div>
      </div>
    </header>
    <div class="container-lg container-fluid">
      <div class="wall">
        <div class="wall__header">Задачи</div>
        <div class="wall__body">
          <div class="wall__body-comment">
            <template v-for="task in taskWall">
              <task-form
                :key="task.uuid"
                @closeForm="editedTaskID = ''"
                v-if="editedTaskID === task.uuid"
              ></task-form>
              <task-card
                :key="task.uuid"
                v-if="editedTaskID !== task.uuid"
                @edit-task="editTaskChange(task)"
                @close-form="editedTaskID = ''"
                :task="task"
              ></task-card>
            </template>
            <task-form @closeForm="editedTaskID = ''" v-if="editedTaskID === 'new'"></task-form>
            <add-task-card @clickAddTask="editTaskChange(null)" v-else></add-task-card>
          </div>
        </div>
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

.wall {
  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Roboto', serif;
    font-style: normal;
    font-weight: 500;
    color: #181a2b;

    @include media-breakpoint-down(lg) {
      height: 80px;
      font-size: 24px;
      line-height: 135%;
    }

    @include media-breakpoint-up(lg) {
      height: 80px;
      font-size: 32px;
      line-height: 135%;
    }
  }

  &__body {
    &-comment {
      width: 100%;
      display: grid;

      @include media-breakpoint-down(lg) {
      }

      @include media-breakpoint-up(lg) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
      }
    }
  }
}

.todo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 200px;

  &__left {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include media-breakpoint-down(lg) {
      width: 75%;
    }

    @include media-breakpoint-up(lg) {
      width: 75%;
    }

    &-fields {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-avatar {
      width: 88px;
      height: 88px;
      position: relative;
    }
  }
}

.avatar {
  width: 88px;
  height: 88px;
  background: #eef1f7;
  border: 1px solid #ffdc59;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(20, 22, 43, 0.1);
  }

  &-add {
    left: 60px;
    top: -5px;
  }

  &-delete {
    left: 60px;
    top: 65px;
  }
}
</style>
