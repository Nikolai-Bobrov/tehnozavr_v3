<template>
  <section class="catalog">

    <ul class="catalog__list">

      <ProductItem v-for="product in products" :product="product" :key="product.id"/>
    </ul>
      <BasePagination :pages="pages" v-model:page="page"/>
  </section>
</template>


<script>
import {defineComponent} from 'vue'
import ProductItem from "@/components/ProductItem.vue";
import BasePagination from "@/components/BasePagination.vue";

export default defineComponent({
  name: "ProductList",
  props:['products','pages','pagePaginate'],
  emits:['update:pagePaginate'],
  components:{ProductItem,BasePagination},
  computed:{
    page: {
      get(){
        return this.pagePaginate
      },
      set(page){
        this.$emit("update:pagePaginate", page)
      }
    }
  }
})
</script>


