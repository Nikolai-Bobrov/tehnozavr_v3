
<template>
  <ul class="catalog__pagination pagination" v-if="pages > 0">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === 1}" aria-label="Предыдущая страница" @click.prevent="paginateBack(page - 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumb in pages" :key="pageNumb">
      <a  class="pagination__link" :class="{'pagination__link--current': pageNumb === page}" @click.prevent="paginate(pageNumb)">
        {{ pageNumb }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === pages}" href="#" aria-label="Следующая страница" @click.prevent="paginateNext(page +1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BasePagination",
  props:['pages', 'page'],
  emits:['update:page'],

  methods:{
    paginate(page){
      this.$emit("update:page", page)
    },
    paginateNext(page){
      if(page !== this.pages + 1){
        this.$emit("update:page", page)
      }
    },
    paginateBack(page){
      if(page !== 0){
        this.$emit("update:page", page)
      }
    }
  }

})
</script>


