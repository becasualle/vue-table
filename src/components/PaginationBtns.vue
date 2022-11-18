<template>
  <div class="buttons">
    <button
      v-for="num in pageNumbers"
      :key="num"
      :class="['page-btn', { active: table.currPageNum === num }]"
      @click="() => table.setPageNum(num)"
    >
      {{ num }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "../stores/table";

interface Props {
  pagesNum: number;
}

const props = defineProps<Props>();

const table = useTableStore();
// @ts-ignore
window.stores = { table };

const pageNumbers = computed(() =>
  Array.from({ length: props.pagesNum }, (_, index) => index + 1)
);
</script>

<style scoped lang="scss">
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

  &.active {
    background: var(--primary-500);
    color: var(--white);
  }
}
</style>
