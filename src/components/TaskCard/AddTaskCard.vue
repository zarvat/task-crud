<script setup lang="ts">
const emit = defineEmits(['clickAddTask']);

const onClick = () => {
  emit('clickAddTask');
};
</script>

<template>
  <button class="comment-card pure-button" @click="onClick">+</button>
</template>

<style scoped lang="scss">
.comment-card {
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(20, 22, 43, 0.1);
  border-radius: 8px;
  height: 200px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 150px;

  @include media-breakpoint-down(lg) {
    padding: 18px 20px 18px;
  }

  @include media-breakpoint-up(lg) {
    padding: 22px 20px;
  }

  &:hover {
    box-shadow: 0px 0px 15px rgba(200, 22, 43, 0.5);
  }
}
</style>
