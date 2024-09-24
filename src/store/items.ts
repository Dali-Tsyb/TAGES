import { defineStore } from "pinia";
import itemsData from "../assets/items.json";
import materialsData from "../assets/materials.json";

export type Item = {
   id: string;
   name: string;
   code: string | null;
   price: {
      old_price: number | null;
      current_price: number;
   };
   image: {
      url: string;
   };
   material: number;
};

export type Material = {
   id: string;
   name: string;
};

export const useItemsStore = defineStore("items", {
   state: (): {
      items: Item[];
      materials: Material[];
      selectedPrice: string;
      selectedMaterial: string | undefined;
   } => ({
      items: [],
      materials: [],
      selectedPrice: "Цена по возрастанию",
      selectedMaterial: "Все",
   }),

   actions: {
      loadData() {
         this.items = itemsData;
         this.materials = materialsData;
         //округление цен
         this.items.forEach((item) => {
            (item.price.current_price = parseFloat(
               item.price.current_price.toFixed(2)
            )),
               (item.price.old_price = item.price.old_price
                  ? parseFloat(item.price.old_price.toFixed(2))
                  : null);
         });
      },
   },

   getters: {
      filteredItems: (state) => {
         let filteredItems = state.items;
         //замена названия материала на айдишку
         const materialId = state.materials.find(
            (material) => material.name === state.selectedMaterial
         )?.id;
         //фильтр по материалам
         if (materialId) {
            filteredItems = state.items.filter((item) => {
               return item.material === parseInt(materialId as string);
            });
         }
         //фильтр по цене
         if (state.selectedPrice === "Цена по возрастанию") {
            filteredItems.sort(
               (a, b) => a.price.current_price - b.price.current_price
            );
         }
         if (state.selectedPrice === "Цена по убыванию") {
            filteredItems.sort(
               (a, b) => b.price.current_price - a.price.current_price
            );
         }
         return filteredItems;
      },
   },
});

export default useItemsStore;
