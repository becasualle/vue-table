<template>
  <div class="buttons">
    <button
      v-for="num in pageNumbers"
      :key="num"
      :class="['page-btn', { active: table.currPageNum === num }]"
      @click="() => onPageChange(num)"
    >
      {{ num }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "../stores/table";
import { useRouter } from "vue-router";

interface Props {
  pagesNum: number;
}

const props = defineProps<Props>();
const router = useRouter();

const table = useTableStore();
const currentPage = computed(() => table.currPageNum);
// console.log(table.currPageNum);

// // @ts-ignore
// window.stores = { table };

const pageNumbers = computed(() =>
  Array.from({ length: props.pagesNum }, (_, index) => index + 1)
);

const onPageChange = (pageNumber: number) => {
  table.setPageNum(pageNumber);
  router.push({ query: { page: pageNumber } });
};
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
