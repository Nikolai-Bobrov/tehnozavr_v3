<template>
  <GlobalHeader/>
<!--  <router-view></router-view>-->
  <MainPage/>
  <GlobalFooter/>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
import MainPage from "@/pages/MainPage.vue";
// import ProductPage from "@/pages/ProductPage.vue";

// const routes = {
//   main: 'MainPage',
//   product: 'ProductPage'
// }
export default {

  components: {
    MainPage,
    GlobalHeader,
    GlobalFooter
  },

}
</script>


