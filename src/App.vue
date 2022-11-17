<template>
  <header></header>

  <main>
    <DataTable :data="tableData" :columns="tableColumns" />
  </main>
</template>

<script setup lang="ts">
import { watchEffect, ref, computed } from "vue";
import DataTable from "./components/DataTable.vue";
import { apiData } from "./data/api";
import type { Data } from "./data/api";

export type TableColumns =
  | "Аватар"
  | "ФИО"
  | "Пол"
  | "Страна"
  | "Дата рождения"
  | "Email"
  | "Телефон";

// Get data for the table
const tableInfo = ref<Data | null>(null);

watchEffect(async () => {
  console.log("watch effect");
  // mock API request
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData);
    }, 500);
  });
  tableInfo.value = data as Data;
});

const tableColumns: TableColumns[] = [
  "Аватар",
  "ФИО",
  "Пол",
  "Страна",
  "Дата рождения",
  "Email",
  "Телефон",
];

const tableData = computed(() => tableInfo.value?.results);
</script>

<style scoped lang="scss"></style>
