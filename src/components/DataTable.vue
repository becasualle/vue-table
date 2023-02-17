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
        <td v-for="(value, key, index) in entry" :key="index">
          <div v-if="key === 'avatar'">
            <img :src="value" alt="profile avatar" />
          </div>
          <div v-else>{{ value }}</div>
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
defineProps<Props>();
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  font-size: 14px;
  table-layout: fixed;
  border-collapse: collapse;

  th {
    background-color: var(--primary-600);
    color: #fff;
    text-align: left;
    &:first-child {
      width: 10%;
    }
    /* cursor: pointer; */
  }

  th,
  td {
    padding: 10px 20px;
  }
  td {
    img {
      border-radius: 50%;
    }
  }
}
</style>
