<template>
  <GlobalHeader/>
  <MainPage/>
  <GlobalFooter/>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import MainPage from "@/pages/MainPage.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";

export default {

  components: {
    MainPage,
    GlobalHeader,
    GlobalFooter
  }
}
</script>


