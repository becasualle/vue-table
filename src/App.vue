<template>
  <header></header>

  <main>
    <DataTable :columns="tableColumns" />
  </main>
</template>

<script setup lang="ts">
import DataTable from "./components/DataTable.vue";
import { data } from "./data/api";

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
