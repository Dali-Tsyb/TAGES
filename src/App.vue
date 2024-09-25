<script setup lang="ts">
import { watch } from "vue";

import useItemsStore from "./store/items";
import useCartStore from "./store/cart";
import useFavoritesStore from "./store/favorites";
import ItemCard from "./components/ItemCard.vue";
import Dropdown from "./components/Dropdown.vue";

const itemsStore = useItemsStore();
itemsStore.loadData();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

//ФИЛЬТРЫ
const filtersMaterialOptions = itemsStore.materials.map(
   (material) => material.name
);
filtersMaterialOptions.unshift("Все");
const filtersPriceOptions = ["Цена по возрастанию", "Цена по убыванию"];

//КОРЗИНА
//функция проверки наличия элемента в корзине
const isAddedToCart = (id: string) =>
   cartStore.items.some((item: any) => item.id === id);
//запись данных корзины в локальное хранилище
watch(
   cartStore.items,
   (value) => {
      localStorage.setItem("cart", JSON.stringify(value));
   }
);
//ИЗБРАННОЕ
const isAddedToFavorites = (id: string) =>
   favoritesStore.items.some((item: any) => item.id === id);
watch(
   favoritesStore.items,
   (value) => {
      localStorage.setItem("favorites", JSON.stringify(value));
   }
);
</script>

<template>
   <nav class="path">
      <a href="#" class="path__link">Главная</a>
      <span class="path__slash"> / </span>
      <a href="#" class="path__link">Системы хранения</a>
      <span class="path__slash"> / </span>
      <a href="#" class="path__link">Комплекты стеллажных систем</a>
   </nav>
   <h1 class="header">Комплекты стеллажных систем</h1>
   <div class="filters">
      <div class="filters__item">
         <div class="filters__title">Сортировать по:</div>
         <Dropdown
            :options="filtersPriceOptions"
            v-model:selectedOption="itemsStore.selectedPrice"
         />
      </div>
      <div class="filters__item">
         <div class="filters__title">Материал</div>
         <Dropdown
            :options="filtersMaterialOptions"
            v-model:selectedOption="itemsStore.selectedMaterial"
         />
      </div>
   </div>
   <div class="items" v-auto-animate>
      <ItemCard
         v-for="item in itemsStore.filteredItems"
         :key="item.id"
         :item="item"
         :isAddedToCart="isAddedToCart(item.id)"
         :isAddedToFavorites="isAddedToFavorites(item.id)"
         @toggleCart="cartStore.toggleCart(item)"
         @toggleFavorite="favoritesStore.toggleFavorite(item)"
      />
   </div>
</template>

<style scoped>
/* PATH */
.path {
   display: flex;
   align-items: center;
   gap: 0.6vw;
}
.path__link,
.path__slash {
   opacity: 0.7;
   font-size: 0.86vw;
}
.path__link {
   cursor: pointer;
   transition: opacity 0.2s;
}
.path__link:hover {
   opacity: 1;
}
.path__link:last-child {
   opacity: 1;
}

/* HEADER */
.header {
   font-family: "SF Pro Display";
   font-weight: 600;
   font-size: 1.88vw;
   margin: 1.6vw 0;
}

/* FILTERS */
.filters {
   margin-top: 2vw;
   display: flex;
   align-items: center;
   gap: 1.3vw;
}
.filters__item {
   display: flex;
   flex-direction: column;
   gap: 0.4vw;
}
.filters__title {
   font-size: 0.6vw;
   color: rgba(79, 79, 79, 1);
   padding: 0 0.8vw;
}

/* ITEMS */
.items {
   margin-top: 2vw;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 2vw;
   width: 100%;
}

@media (width < 1280px) {
   .path__link,
   .path__slash {
      font-size: 1vw;
   }
   .filters__title {
      font-size: 0.8vw;
   }
}
@media (width < 768px) {
   .path__link,
   .path__slash {
      font-size: 1.1vw;
   }
   .filters__title {
      font-size: 1vw;
   }
   .items {
      margin-top: 3vw;
      grid-template-columns: repeat(3, 1fr);
   }
}
@media (width < 480px) {
   .path__link,
   .path__slash {
      font-size: 2.2vw;
   }
   .header {
      font-size: 6vw;
      margin: 7vw 0;
   }
   .filters {
      flex-direction: column;
      align-items: flex-start;
      gap: 3vw;
   }
   .filters__item:first-child {
      z-index: 200;
   }
   .filters__title {
      font-size: 2.6vw;
   }
   .items {
      margin-top: 9vw;
      grid-template-columns: repeat(1, 1fr);
      gap: 7vw;
      padding: 0 6vw;
   }
}
</style>
