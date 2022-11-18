<template>
  <div class="pagination-btns">
    <button v-for="num in pageNumbers" :key="num">{{ num }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  pagesNum: number;
}

const props = defineProps<Props>();

const pageNumbers = computed(() =>
  Array.from({ length: props.pagesNum }, (_, index) => index + 1)
);
</script>

<style scoped></style>
