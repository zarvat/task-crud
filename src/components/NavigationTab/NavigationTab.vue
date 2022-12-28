<script setup lang="ts"></script>

<template>
  <nav class="navigation">
    <router-link class="navigation__button" to="/">Главная</router-link>
    <router-link class="navigation__button" to="/todo">ToDo</router-link>
    <router-link class="navigation__button" to="/typescript">TS</router-link>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  background: #cccccc;
  box-shadow: 0px 0px 15px rgba(50, 50, 50, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 30px;

  display: flex;
  flex-direction: row;
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
