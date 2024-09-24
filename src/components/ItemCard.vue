<script setup lang="ts">
defineProps({
   item: {
      type: Object,
      required: true,
   },
   isAddedToCart: Boolean,
   isAddedToFavorites: Boolean,
});

defineEmits(["toggleCart", "toggleFavorite"]);
</script>

<template>
   <div class="item-card">
      <img :src="item.image.url" alt="товар" class="item-card__image" />
      <div class="item-card__code">{{ item.code }}</div>
      <div class="item-card__name">{{ item.name }}</div>
      <div class="item-card__price">
         <div v-if="item.price.old_price" class="item-card__old-price">
            {{ item.price.old_price }}₽
         </div>
         <div class="item-card__current-price">
            {{ item.price.current_price }}₽
         </div>
      </div>
      <div class="item-card__buttons">
         <button class="item-card__cart-button" @click="$emit('toggleCart')">
            <img
               :src="isAddedToCart ? '/icons/check.svg' : '/icons/cart.svg'"
               alt="корзина"
               class="item-card__button-image"
            />
         </button>
         <button
            class="item-card__favorite-button"
            @click="$emit('toggleFavorite')"
         >
            <img
               :src="
                  isAddedToFavorites ? '/icons/fav_added.svg' : '/icons/fav.svg'
               "
               alt="избранное"
               class="item-card__button-image"
            />
         </button>
      </div>
      <div v-if="item.price.old_price" class="item-card__sale">Скидка</div>
   </div>
</template>

<style scoped>
.item-card {
   position: relative;
   width: 17.6vw;
   border: 1px solid rgba(238, 238, 238, 1);
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   padding: 0.7vw 0.65vw;
   cursor: pointer;
   transition: 0.2s;
}
.item-card:hover {
   scale: 1.02;
}
.item-card__image {
   width: 75%;
   align-self: center;
}
.item-card__code {
   color: rgba(136, 136, 136, 1);
   font-size: 0.54vw;
   margin-top: 1.2vw;
}
.item-card__name {
   font-weight: 500;
   font-size: 0.8vw;
   letter-spacing: 0.035vw;
   margin-top: 0.6vw;
}
.item-card__price {
   display: flex;
   align-items: center;
   gap: 0.6vw;
   margin-top: 0.6vw;
}
.item-card__old-price {
   color: rgba(136, 136, 136, 1);
   font-size: 0.8vw;
   text-decoration: line-through;
}
.item-card__current-price {
   font-size: 0.8vw;
}
.item-card__buttons {
   position: absolute;
   bottom: 0.6vw;
   right: 1.2vw;
   display: flex;
   gap: 1.4vw;
}
.item-card__button-image {
   width: 1.05vw;
   cursor: pointer;
   transition: scale 0.2s;
}
.item-card__button-image:hover {
   scale: 1.1;
}
.item-card__button-image:active {
   scale: 0.9;
}
.item-card__sale {
   position: absolute;
   top: 0.4vw;
   left: 0;
   font-family: "SF Pro Display";
   font-size: 0.76vw;
   font-weight: 500;
   color: rgba(255, 255, 255, 1);
   background: rgba(235, 87, 87, 1);
   padding: 0.2vw 0.8vw;
}
</style>
