<template>
  <main v-if="productLoading" class="item__load-prod content">
    <div class="loadProd">
      <span class="loader"></span>
      <p>Идет загрузка товара</p>
    </div>
  </main>

  <main v-if="productLoadingFailed" class="item__load-prod content">
    <div class="loadProd">
      <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>cross-round</title>
        <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"></path>
      </svg>
      <p>Произошла ошибка при загрузке товаров.</p>
      <button class="button--reload" @click.prevent="loadProduct">Попробовать еще раз</button>
    </div>
  </main>

  <main v-else-if="productLoading === false" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ path:'/' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ path:'/'}" class="breadcrumbs__link" >
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Смартфон Xiaomi Mi Mix 3 6/128GB
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.preview.file.url" srcset="img/phone-square@2x.jpg 2x" alt="Название товара">
        </div>

      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ priceFormat }} ₽
            </b>

            <fieldset class="form__block" v-if="product.mainProp.code === 'color'">
              <legend class="form__legend">{{ product.mainProp.title }}:</legend>
              <ul class="colors">

                <li class="colors__item" v-for="offer in offers" :key="offer.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value=""  checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">
                    <span class="colors__value" style="background-color: #FFBE15;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">
                    <span class="colors__value" style="background-color: #939393;">
                  </span></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block" v-if="product.mainProp.code !== 'color'">
              <legend class="form__legend">{{ product.mainProp.title }}:</legend>
              <ul class="sizes sizes--primery" >
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click="productReduse(this.countProduct)" >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model="this.countProduct" name="count" >

                <button type="button" aria-label="Добавить один товар" @click="countProduct++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link " :class="{ 'tabs__link--current' : this.specifications === false }" @click="this.specifications = false">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link " :class="{ 'tabs__link--current' : this.specifications }" @click="this.specifications = true">
              Характеристики
            </a>

          </li>
          <li class="tabs__item">
            <a class="tabs__link" >
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content" v-if="this.specifications === false">
          {{ product.content }}
        </div>

        <div class="item__content" v-if="this.specifications">

          <div v-for="specificate in product.specifications" :key="specificate.id">
            <h3>{{specificate.title}}</h3>
            <p>{{specificate.value}}</p>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import {API_BASE_URL} from "@/config";

export default defineComponent({
  name: "ProductPage",
  data(){
    return {
      productDate: null,

      productLoading: false,
      productLoadingFailed: false,
      otherColors: null,

      specifications: false,


      countProduct: 1,
    }
  },

  computed:{
    product(){
      return this.productDate ? this.productDate : null
    },
    priceFormat(){
      return  this.productDate ? Intl.NumberFormat().format(this.productDate.price) : 0;
    },
    offers(){
      return this.product
          ? this.product.offers.map(offers => {
            return {
              ...offers,
              propValues: offers.propValues[0].value
            }
          }) : []
    },
  },

  methods:{
    loadProduct(){
      this.productLoading = true
      this.productLoadingFailed = false
      clearTimeout(this.loadProductTimer)
      this.loadProductTimer = setTimeout(() => {
        axios.get(API_BASE_URL + "/api/products/" + this.$route.params.id)
            .then(response => (this.productDate = response.data))
            .catch(() => this.productLoadingFailed = true)
            .then(() => this.productLoading = false)
          }, 500)
    },
    productReduse(value){
      if(value > 0){
        this.countProduct = value -1;
      }
    }
  },

  watch: {
    '$route.params.id':{
      handler(){
        this.loadProduct()
      },
      immediate: true
    }
  },
  // created() {
  //   this.loadColors()
  // }
})
</script>

