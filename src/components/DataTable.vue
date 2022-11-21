<template>
  <table>
    <thead>
      <tr>
        <th v-for="(name, index) in columns" :key="index">
          {{ name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data" :key="entry.phone">
        <td v-for="(value, _, index) in entry" :key="index">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { TableColumns, TableData } from "../views/HomeView.vue";
interface Props {
  data: TableData[];
  columns: TableColumns[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  font-size: 14px;
}
th {
  background-color: var(--primary-600);
  color: #fff;
  text-align: left;
  /* cursor: pointer; */
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
</style>
