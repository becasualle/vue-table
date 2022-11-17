<template>
  <header></header>

  <main>
    <!-- <DataTable :data="tableData" :columns="tableColumns" /> -->
  </main>
</template>

<script setup lang="ts">
import { watchEffect, ref, computed, onUpdated } from "vue";
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

// Get rid of redundant information from API data leaving only what is necessary for table data
const tableData = computed(() => {
  const formattedData = tableInfo.value?.results.map((entry) => {
    const {
      picture: { thumbnail: avatar },
      gender,
      location: { country },
      dob: { date: timestamp },
      email,
      phone,
    } = entry;
    const fullName = `${entry.name.title} ${entry.name.first} ${entry.name.last}`;
    return { avatar, fullName, gender, country, timestamp, email, phone };
  });
  return { ...formattedData };
});
</script>

<style scoped lang="scss"></style>
