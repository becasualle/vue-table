<template>
  <header class="header">
    <form class="search">
      <label for="search" class="search__label">Поиск по значению</label>
      <input
        type="text"
        name="search"
        id="search"
        v-model.trim="search"
        placeholder="например: Ukraine"
        class="search__input"
      />
      <span class="search__cross" @click="handleClear">❌</span>
    </form>
    <div class="pagination-btns">
      <PaginationBtns
        v-if="numOfPagesFilteredData > 1"
        :pages-num="numOfPagesFilteredData"
      />
    </div>
  </header>

  <main>
    <DataTable :data="pageData" :columns="tableColumns" />
  </main>
</template>

<script setup lang="ts">
import { watchEffect, ref, computed, watch } from "vue";
import { DataTable, PaginationBtns } from "../components";
import { apiData } from "../data/api";
import type { Data } from "../data/api";
import { useTableStore } from "../stores/table";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";

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

// TABLE DATA
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

  const formattedData = tableInfo.value.results.map((entry, idx) => {
    const {
      picture: { thumbnail: avatar },
      gender,
      location: { country },
      dob: { date: timestamp },
      email,
      phone,
    } = entry;
    const fullName = `${entry.name.title} ${entry.name.first} ${entry.name.last}`;
    return {
      avatar,
      fullName,
      gender,
      country,
      timestamp: dayjs(timestamp).format("DD.MM.YYYY"),
      email,
      phone,
    };
  });

  return formattedData;
});

// FILTRATION
const search = ref("");
const router = useRouter();
const route = useRoute();

if ("search" in route.query) {
  search.value = route.query.search as string;
}

watch(search, () => {
  if (search.value && route.query.search !== search.value) {
    table.setPageNum(1);
    router.push({ path: "/", query: { search: search.value, page: 1 } });
  }
});

const filteredData = computed(() => {
  return tableData.value.filter((entry) => {
    return Object.values(entry).some((value: string) =>
      value.toLowerCase().trim().includes(search.value)
    );
  });
});

const handleClear = () => {
  search.value = "";
  router.push({ path: "/" });
};

const table = useTableStore();

// calculate how many pages of filtered data are existing
const numOfPagesFilteredData = computed(() =>
  Math.ceil(filteredData.value.length / 20)
);

// Get data for the current page
const pageData = computed(() => {
  // when only one page don't need to compute page data
  if (numOfPagesFilteredData.value === 1) return filteredData.value;

  // cut piece of data for current page
  // when page = 1, startindex = 0, endIndex = 20 and cut 20 results with indexes from 0 to 19
  // when page = 2, startindex = 20, endIndex = 40 (20 elements with idx from 20 to 39)
  const startIndex = (table.currPageNum - 1) * 20;
  const endIndex = startIndex + 20;
  return filteredData.value.slice(startIndex, endIndex);
});
</script>

<style scoped lang="scss">
.header {
  margin: 1rem auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.search {
  &__label {
    margin-right: 0.5rem;
  }
  &__input {
    border: 1px solid var(--grey-300);
    padding: 8px 16px;
    border-radius: var(--borderRadius);
    background-color: #fff;
    box-shadow: var(--shadow-1);
  }
  &__cross {
    font-size: 14px;
    margin-left: 0.25rem;
    cursor: pointer;
  }
}
</style>
