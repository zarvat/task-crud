<script setup lang="ts">
import type { UserCommentView } from '@/types/view';

interface Props {
  comment: UserCommentView;
}
const props = defineProps<Props>();
() => {
  return props;
};
</script>

<template>
  <div class="comment-card">
    <div class="comment-card__header text-header">{{ comment.title }}</div>
    <div class="comment-card__body text-">{{ comment.content }}</div>
    <div class="comment-card__footer">
      <div class="comment-card__author">{{ comment.authorName }}</div>
      <div class="comment-card__date">{{ comment.date }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-card {
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
}
</style>
