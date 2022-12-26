<script setup lang="ts">
import CommentCard from '@/components/CommentCard/CommentCard.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { USER_SEX, USER_STATUSES } from '@/constants';
import type { UserView } from '@/types/view';
import AddCommentCard from '@/components/CommentCard/AddCommentCard.vue';
import CommentForm from '@/components/CommentForm/CommentForm.vue';
const store = useStore(key);

const isEditComment = ref(false);

const user = computed<UserView | null>(() => store.getters['user/getUser']);

const username = computed(() => user.value?.name || 'Пользователь не найден');
const userStatus = computed(() =>
  user.value?.status ? USER_STATUSES[user.value.status] : 'Пользователь не найден'
);
const userAge = computed(() => user.value?.age || 'Пользователь не найден');
const userSex = computed(() =>
  user.value?.sex ? USER_SEX[user.value.sex] : 'Пользователь не найден'
);
const userAvatar = computed(() => user.value?.avatar || 'Пользователь не найден');
const userWall = computed(() => user.value?.wall || '_');

store.dispatch('user/getItem', { uuid: '3422b448-2460-4fd2-9183-8000de6f8343' });

const addAvatar = () => {
  return;
};
const deleteAvatar = () => {
  return;
};
</script>

<template>
  <main>
    <header class="header">
      <div class="container-lg container-fluid">
        <div class="user">
          <div class="user__left">
            <div class="user__left-name text-header">{{ username }}</div>
            <div class="user__left-fields">
              <div class="user__left-fields-status">Статус: {{ userStatus }}</div>
              <div class="user__left-fields-age">Возраст: {{ userAge }}</div>
              <div class="user__left-fields-sex">Пол: {{ userSex }}</div>
            </div>
          </div>
          <div class="user__right">
            <div class="user__right-avatar">
              <img :src="userAvatar" alt="avatar" class="avatar" />
              <button class="avatar-button avatar-add" @click="addAvatar">
                <img class="avatar-icon" src="../assets/icons/photo.svg" alt="avatar" />
              </button>
              <button
                class="avatar-button avatar-delete"
                :class="{ 'd-none': false }"
                @click="deleteAvatar"
              >
                <img class="avatar-icon" src="../assets/icons/trash.svg" alt="avatar" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="container-lg container-fluid">
      <div class="wall">
        <div class="wall__header">Комментарии</div>
        <div class="wall__body">
          <div class="wall__body-comment">
            <comment-card
              v-for="comment in userWall"
              :key="comment.uuid"
              :comment="comment"
            ></comment-card>
            <add-comment-card
              @clickAddComment="isEditComment = true"
              v-if="!isEditComment"
            ></add-comment-card>
            <comment-form @closeForm="isEditComment = false" v-else></comment-form>
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

.user {
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
