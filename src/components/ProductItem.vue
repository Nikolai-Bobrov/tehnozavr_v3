<template>
  <li class="catalog__item" :key="product.id">
    <a class="catalog__pic" href="#">
      <img :src="product.preview.file.url"  :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ priceFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li v-for="color in product.colors" class="colors__item" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="color.color.code" checked="" >
          <span class="colors__value" :style="{ backgroundColor: color.color.code }">
                  </span>
        </label>
      </li>
    </ul>
<!--    <ul class="sizes">-->
<!--      <li class="sizes__item">-->
<!--        <label class="sizes__label">-->
<!--          <input class="sizes__radio sr-only" type="radio" name="sizes-1" value="32">-->
<!--          <span class="sizes__value">-->
<!--                    32gb-->
<!--                  </span>-->
<!--        </label>-->
<!--      </li>-->
<!--      <li class="sizes__item">-->
<!--        <label class="sizes__label">-->
<!--          <input class="sizes__radio sr-only" type="radio" name="sizes-1" value="64">-->
<!--          <span class="sizes__value">-->
<!--                    64gb-->
<!--                  </span>-->
<!--        </label>-->
<!--      </li>-->
<!--      <li class="sizes__item">-->
<!--        <label class="sizes__label">-->
<!--          <input class="sizes__radio sr-only" type="radio" name="sizes-1" value="128" checked="">-->
<!--          <span class="sizes__value">-->
<!--                    128gb-->
<!--                  </span>-->
<!--        </label>-->
<!--      </li>-->
<!--    </ul>-->
  </li>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: "ProductItem",
  props: ['product'],
  computed:{
    priceFormat(){
     return Intl.NumberFormat().format(this.product.price);
    }
  }
})
</script>


