<template>
  <div class="buttons" @click="counter.increment">
    <button v-for="num in pageNumbers" :key="num" class="page-btn">
      {{ num }}
    </button>
  </div>
  <div>{{ counter.count }}</div>
  <div>{{ counter.doubleCount }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";

interface Props {
  pagesNum: number;
}

const props = defineProps<Props>();

const counter = useCounterStore();
// @ts-ignore
window.stores = { counter };

const pageNumbers = computed(() =>
  Array.from({ length: props.pagesNum }, (_, index) => index + 1)
);
</script>

<style scoped>
.buttons {
  background: var(--primary-100);
  border-radius: var(--borderRadius);
}
.page-btn {
  background: transparent;
  border-color: transparent;
  width: 50px;
  height: 40px;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-500);
  transition: var(--transition);
  border-radius: var(--borderRadius);
  cursor: pointer;

  /* &.active {
    background: var(--primary-500);
    color: var(--white);
  } */
}
</style>
