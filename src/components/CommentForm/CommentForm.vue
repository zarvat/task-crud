<script setup lang="ts">
import { computed } from 'vue';
import { UserCommentView } from '@/types/view';
import { store } from '@/store';

const emit = defineEmits(['closeForm']);

const onReset = () => {
  emit('closeForm');
};

const userComment = computed<UserCommentView>(() => store.getters['comment/getNewComment']);

const titleValue = computed<string>({
  get() {
    return userComment.value.title;
  },
  set(value: string) {
    store.commit('comment/setNewCommentTitle', value);
  },
});

const contentValue = computed<string>({
  get() {
    return userComment.value.content;
  },
  set(value: string) {
    store.commit('comment/setNewCommentContent', value);
  },
});

const onSubmit = async () => {
  await store.dispatch('comment/setNewComment');
  emit('closeForm');
};
</script>

<template>
  <main>
    <form class="comment-form" @submit.prevent="onSubmit" @reset="onReset">
      <input v-model="titleValue" class="form-input" name="title" />
      <input v-model="contentValue" class="form-input" name="content" />
      <button type="submit">Оставить комментарий</button>
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
  justify-content: center;
  align-items: center;
  font-weight: bolder;

  @include media-breakpoint-down(lg) {
    padding: 18px 20px 18px;
  }

  @include media-breakpoint-up(lg) {
    padding: 22px 20px;
  }
}
</style>
