import { defineStore } from "pinia";

const useFavoritesStore = defineStore("favorites", {
   state: () => ({
      items: localStorage.getItem("favorites")
         ? JSON.parse(localStorage.getItem("favorites") as string)
         : ([] as object[]),
   }),

   actions: {
      toggleFavorite(item: any) {
         if (this.items.includes(item)) {
            this.items = this.items.filter((i: any) => i.id !== item.id);
         } else {
            this.items.push(item);
         }
         localStorage.setItem("favorites", JSON.stringify(this.items));
      },
   },
});

export default useFavoritesStore;
