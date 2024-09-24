import { defineStore } from "pinia";

const useCartStore = defineStore("cart", {
   state: () => ({
      items: localStorage.getItem("cart")
         ? JSON.parse(localStorage.getItem("cart") as string)
         : ([] as object[]),
   }),

   actions: {
      toggleCart(item: any) {
         if (this.items.includes(item)) {
            this.items = this.items.filter((i: any) => i.id !== item.id);
         } else {
            this.items.push(item);
         }
         localStorage.setItem("cart", JSON.stringify(this.items));
      },
   },
});

export default useCartStore;
