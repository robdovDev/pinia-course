import { groupBy } from "lodash";
import { defineStore } from "pinia";

// function sumCart(state) {
//   let total = 0;
//   for (let i = 0; i < state.items.length; i++) {
//     total += state.items[i].price;
//   }
//   return total;
// }
export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
    cartTotal: (state) => state.items.reduce((p, c) => p + c.price, 0),
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },
  },
});
