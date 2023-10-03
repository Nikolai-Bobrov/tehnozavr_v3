
<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" >
          <input class="form__input" type="number" name="min-price" v-model.number="currentPriceFrom" placeholder="0">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" placeholder="999999">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select"  name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>


      <div v-if="categoryProp !== 0"  >
        <fieldset class="form__block" v-for="prop in categoryProp" :key="prop.id">
          <legend class="form__legend">{{ prop.title }}</legend>
          <ul class="check-list">
            <li class="check-list__item" v-for="property in prop.availableValues" :key="property.value">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" v-model="currentFilterPropId" :value="property.value" @change="addCurrentFilterProp(prop.code)">
                <span class="check-list__desc" >
                    {{ property.value }}
                    <span>({{ property.productsCount }})</span>
                  </span>
              </label>
            </li>
          </ul>
        </fieldset>
      </div>


      <button class="filter__submit button button--primery" type="submit" >
        Применить
      </button>
      <button v-if="btnReset"  class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>


<script>
import {defineComponent} from 'vue'
import {API_BASE_URL} from "@/config";
import axios from "axios";

export default defineComponent({
  name: "ProductFilter",
  // props:['filterData', 'colorId', 'priceTo', 'filterName','filterPropId'],
  emits:['update:categoryId',  'update:priceFrom', 'update:priceTo', 'update:filterName', 'update:filterPropId'],
  data(){
    return {
      categoriesData:null,
      categoryDesc: null,

      currentCategoryId:0,

      currentPriceFrom:null,
      currentPriceTo: null,

      currentFilterName: [],
      currentFilterPropId: [],

      btnReset: false
    }
  },
  computed:{
    categories(){
      return this.categoriesData ? this.categoriesData.items : [];
    },

    categoryProp(){
      return this.categoryDesc ? this.categoryDesc.productProps :[];
    }
  },
  watch: {
    currentCategoryId(){
      if(this.currentCategoryId !== 0){
        this.btnReset = true
      }
      this.currentFilterPropId = [];
      this.currentFilterName = [];
      this.getCategory()
    },
    currentPriceFrom(){
      if(this.currentPriceFrom !==null){
        this.btnReset = true
      }
    },
    currentPriceTo(){
      if(this.currentPriceTo !==null){
        this.btnReset = true
      }
    },
      },
  methods:{
    submit(){
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:filterName', this.currentFilterName);
      this.$emit('update:filterPropId', this.currentFilterPropId);
    },
    reset(){
      this.$emit('update:categoryId', 0);
      this.$emit('update:priceFrom', null);
      this.$emit('update:priceTo', null);
      this.$emit('update:filterName', []);
      this.$emit('update:filterPropId', []);
      this.currentPriceFrom = null;
      this.currentPriceTo = null;
      this.currentCategoryId = 0;
      this.btnReset = false;
    },

    loadCategories(){
      axios.get(API_BASE_URL + '/api/productCategories')
          .then(response => this.categoriesData = response.data)
    },
    getCategory(){
      if(this.currentCategoryId) {
        axios.get(API_BASE_URL + '/api/productCategories/' + this.currentCategoryId)
            .then(response => this.categoryDesc = response.data)
      } else {
       return this.categoryDesc = [];
      }
    },
    addCurrentFilterProp(code){
      this.currentFilterName = `props[${code}]`;
    }
  },
  created(){
    this.loadCategories()
  }
})
</script>
