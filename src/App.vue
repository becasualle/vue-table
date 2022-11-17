<template>
  <header></header>

  <main>
    <DataTable :columns="tableColumns" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, ref } from "vue";
import DataTable from "./components/DataTable.vue";
import { apiData } from "./data/api";
import type { Data } from "./data/api";

// Get data for the table
const tableData = ref<Data | null>(null);

watchEffect(async () => {
  console.log("watch effect");
  // mock API request
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData);
    }, 2000);
  });
  tableData.value = data as Data;
});

const tableColumns = [
  "Аватар",
  "ФИО",
  "Пол",
  "Страна",
  "Дата рождения",
  "Email",
  "Телефон",
];
</script>

<style scoped lang="scss"></style>
