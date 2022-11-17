<template>
  <table>
    <thead>
      <th v-for="(name, index) in columns" :key="index">
        {{ name }}
        <span class="arrow asc"></span>
      </th>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script setup lang="ts">
interface Props {
  columns: string[];
}

const props = defineProps<Props>();
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
