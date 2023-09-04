<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{countProductsFn}} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter/>
      <div v-if="productsLoading" class="loadProd">
        <span class="loader"></span>
        <p>Идет загрузка товара</p>
      </div>
      <div v-if="productsLoadingFailed" class="loadProd">
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>cross-round</title>
          <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"></path>
        </svg>
        <p>Произошла ошибка при загрузке товаров.</p>
        <button class="button--reload" @click.prevent="loadProducts">Попробовать еще раз</button>
      </div>

      <ProductList v-if="productsLoading === false" :products="products" :pages="pagesFn" v-model:pagePaginate="page"/>

    </div>
  </main>
</template>


<script>
import {defineComponent} from 'vue'
import ProductList from "@/components/ProductList.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import {API_BASE_URL} from "@/config";

export default defineComponent({
  name: "MainPage",
  components: {ProductList, ProductFilter},
  data(){
    return {
      //Товары
      storeProducts: null,
      countProducts: null,
      productsLoading: false,
      productsLoadingFailed: false,
      
      // Пагинация
      page: 1,
      productsPerPage: 6,

    }
  },
  computed: {
    countProductsFn(){
      return this.storeProducts ? this.storeProducts.pagination.total : 0;
    },
    products(){
      return this.storeProducts ? this.storeProducts.items : null;
    },
    pagesFn(){
      return this.storeProducts ? this.storeProducts.pagination.pages : 0;
    }
  },
  watch:{
    page(){
      this.loadProducts()
    }
  },
  methods: {
    loadProducts(){
      this.productsLoading = true
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + "/api/products", {
          params:{
            limit: this.productsPerPage,
            page: this.page
          }
        })
            .then(response => (this.storeProducts = response.data))
            .catch(() => this.productsLoadingFailed = true)
            .then(()=> this.productsLoading = false)
      },500)
    },

  },
  created() {
    this.loadProducts();
  }
})
</script>
