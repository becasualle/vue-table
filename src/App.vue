<template>
  <header>
    <form>
      <label for="search">Поиск по значению</label>
      <input type="text" name="search" id="search" v-model="search" />
    </form>
  </header>

  <main>
    <DataTable :data="tableData" :columns="tableColumns" :search="search" />
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

export interface TableData {
  avatar: string;
  fullName: string;
  gender: string;
  country: string;
  timestamp: string;
  email: string;
  phone: string;
}

const defaultTableData: TableData[] = [
  {
    avatar: "",
    fullName: "",
    gender: "",
    country: "",
    timestamp: "",
    email: "",
    phone: "",
  },
];

const search = ref("");

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
  if (!tableInfo.value) {
    return defaultTableData;
  }

  const formattedData = tableInfo.value.results.map((entry) => {
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

  return formattedData;
});
</script>

<style scoped lang="scss"></style>
