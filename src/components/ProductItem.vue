<template>
  <li class="catalog__item" :key="product.id">
    <router-link :to="{ path:`/product/${product.id}` }" class="catalog__pic" href="#">
      <img :src="product.preview"  :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ path:`/product/${product.id}` }">
        {{ titleProduct }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ priceFormat }} ₽
    </span>

    <ul class="colors colors--black" v-if="mainProp === propListColors">
      <li v-for="color in product.colors" class="colors__item" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="color.color.code" >
          <span class="colors__value" :style="{ backgroundColor: color.color.code }">
          </span>
        </label>
      </li>
    </ul>

    <ul class="sizes" v-if="mainProp !== propListColors">
      <li class="sizes__item" v-for="offer in offers" :key="offer.id">
        <label class="sizes__label">
          <input class="sizes__radio sr-only" type="radio" name="sizes-1" :value="offer.propValues" :checked="first">
          <span class="sizes__value" @click="productPriceOffer(offer.price, offer.title)">
            {{ offer.propValues }}
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: "ProductItem",
  props: ['product'],
  data(){
    return{
      propListColors: 'color',
      priceProduct: this.product.price,
      titleProduct: this.product.title,
    }
  },
  computed:{
    offers(){
      return this.product
      ? this.product.offers.map(offers => {
        return {
          ...offers,
          propValues: offers.propValues[0].value
        }
      }) : []
    },
    mainProp(){
      return this.product.mainProp.code
    },
    priceFormat(){
     return Intl.NumberFormat().format(this.priceProduct);
    },

  },
  methods: {
    productPriceOffer(price, title){
       this.priceProduct = price; this.titleProduct = title;
    }
  }
})
</script>


