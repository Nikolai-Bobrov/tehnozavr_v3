

<template>
  <GlobalHeader/>

  <router-view/>

  <GlobalFooter/>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";

export default {

  components: {
    GlobalHeader,
    GlobalFooter
  },

}
</script>


