<script setup lang="ts">
import { store } from '@/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const login = ref('');
const password = ref('');

const $router = useRouter();

const onSubmit = async () => {
  await store.dispatch('user/login', {
    login: login.value,
    password: password.value,
  });
  await $router.push({ name: 'home' });
};
</script>

<template>
  <main>
    <div class="login-container">
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="login-form__username">
          <div class="login-form__username-label">Имя пользователя</div>
          <input v-model="login" class="login-form__username-input" autocomplete="on" />
        </div>
        <div class="login-form__password">
          <div class="login-form__password-label">Пароль</div>
          <input
            v-model="password"
            class="login-form__password-input"
            type="password"
            autocomplete="on"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
.login {
  &-container {
    width: 100vw;
    height: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-form {
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(20, 22, 43, 0.1);
    border-radius: 8px;
    width: 30%;
    height: 30%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    gap: 30px;

    @include media-breakpoint-down(lg) {
      padding: 18px 20px 18px;
    }

    @include media-breakpoint-up(lg) {
      padding: 22px 20px;
    }
  }
}
</style>
