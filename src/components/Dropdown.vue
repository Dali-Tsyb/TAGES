<script setup lang="ts">
import { ref } from "vue";

defineProps({
   options: Array<string>,
   selectedOption: String,
});
//событие обновления выбранной опции
const emit = defineEmits(["update:selectedOption"]);

const isDropdownOpen = ref(false);
//функция переключения видимости выпадающего списка
function toggleDropdown() {
   isDropdownOpen.value = !isDropdownOpen.value;
}
//закрытие выпадающего списка при клике вне его
document.addEventListener("click", (event) => {
   if (
      !(event.target as HTMLElement).closest(
         ".dropdown__button, .dropdown__list"
      )
   ) {
      isDropdownOpen.value = false;
   }
});
//функция обновления выбранной опции
function selectOption(option: string) {
   emit("update:selectedOption", option);
}
</script>

<template>
   <button class="dropdown__button" @click="toggleDropdown">
      <span class="dropdown__text">{{ selectedOption }}</span>
      <img
         src="/icons/arrow.svg"
         alt="стрелка"
         class="dropdown__arrow"
         :class="{ 'dropdown__arrow--active': isDropdownOpen }"
      />
      <ul class="dropdown__list" v-if="isDropdownOpen">
         <li
            v-for="option in options"
            :key="option"
            class="dropdown__item"
            @click="selectOption(option)"
         >
            {{ option }}
         </li>
      </ul>
   </button>
</template>

<style scoped>
* {
   z-index: 10;
   font-family: "SF Pro Display";
}
.dropdown__button {
   position: relative;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background: rgba(242, 242, 242, 1);
   width: 15vw;
   padding: 0.6vw 1vw 0.6vw 0.8vw;
   cursor: pointer;
}
.dropdown__text {
   font-size: 0.77vw;
}
.dropdown__arrow {
   width: 0.9vw;
   height: 0.9vw;
   transition: transform 0.2s;
}
.dropdown__arrow--active {
   transform: rotate(180deg);
}
.dropdown__list {
   position: absolute;
   top: 100%;
   left: 0;
}
.dropdown__item {
   cursor: pointer;
   font-size: 0.77vw;
   text-align: left;
   background: rgba(242, 242, 242, 1);
   width: 15vw;
   padding: 0.6vw 0.8vw;
   transition: background 0.2s;
}
.dropdown__item:hover {
   background: rgb(225, 225, 225);
}

@media (width < 1280px) {
   .dropdown__text,
   .dropdown__item {
      font-size: 0.99vw;
   }
   .dropdown__arrow {
      width: 1vw;
      height: 1vw;
   }
}
@media (width <768px) {
   .dropdown__button,
   .dropdown__item {
      width: 18vw;
      padding: 0.8vw 1.3vw 0.8vw 1vw;
   }
   .dropdown__text,
   .dropdown__item {
      font-size: 1.2vw;
   }
   .dropdown__arrow {
      width: 1.1vw;
      height: 1.1vw;
   }
}
@media(width < 480px) {
   .dropdown__button,
   .dropdown__item {
      width: 42vw;
      padding: 2vw 3vw 2vw 2.2vw;
   }
   .dropdown__text,
   .dropdown__item {
      font-size: 3.1vw;
   }
   .dropdown__arrow {
      width: 2.3vw;
      height: 2.3vw;
   }
}
</style>
