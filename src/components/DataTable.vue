<template>
  <table v-if="isFiltredData">
    <thead>
      <tr>
        <th v-for="(name, index) in columns" :key="index">
          {{ name }}
          <span class="arrow asc"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filtredData" :key="entry.login.uuid">
        <td v-for="(column, index) in columns" :key="index">
          {{ rowsData[column] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Result } from "../data/api";
import type { TableColumns } from "../App.vue";
interface Props {
  data?: Result[];
  columns: TableColumns[];
}

const props = defineProps<Props>();

const filtredData = computed(() => props.data);
const isFiltredData = computed(
  () => filtredData.value && filtredData.value.length
);

const rowsData = computed(() => ({
  Аватар: "https://randomuser.me/api/portraits/thumb/men/27.jpg",
  ФИО: "Mr Noah Arnaud",
  Пол: "male",
  Страна: "France",
  "Дата рождения": "1985-12-27T16:20:39.124Z",
  Email: "noah.arnaud@example.com",
  Телефон: "02-10-87-55-80",
}));
</script>

<style lang="scss" scoped>
th {
  background-color: cornflowerblue;
  color: lightgray;
  cursor: pointer;
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
