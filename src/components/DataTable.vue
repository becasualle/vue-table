<template>
  <table>
    <thead>
      <tr>
        <th v-for="(name, index) in columns" :key="index">
          {{ name }}
          <!-- <span class="arrow asc"></span> -->
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
import { computed } from "vue";
import type { TableColumns, TableData } from "../App.vue";
interface Props {
  data: TableData[];
  columns: TableColumns[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}
th {
  background-color: var(--primary-600);
  color: #fff;
  /* cursor: pointer; */
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
  &.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
}
</style>
