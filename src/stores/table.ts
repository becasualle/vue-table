import { defineStore } from "pinia";
import { ref } from "vue";

export const useTableStore = defineStore("table", () => {
  const currPageNum = ref(1);
  const setPageNum = (page: number) => {
    currPageNum.value = page;
  };
  return { currPageNum, setPageNum };
});
