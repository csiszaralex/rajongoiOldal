<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

import { ref, computed, watch } from 'vue';

export default {
  components: { TheHeader, TheFooter },
  setup() {
    //* data()
    const valamiAdat = ref(35);
    //* methods
    function metodus() {
      valamiAdat.value = 52;
      return valamiAdat.value;
    }
    //* computed
    const comp = computed(() => {
      return valamiAdat.value;
    });
    //* Watch
    watch(valamiAdat, () => {
      valamiAdat.value++;
    });
    //* Minden amit használsz kint azt itt el kell küldeni
    return {
      valamiAdat,
      metodus,
      computed: comp,
    };
  },
};
</script>

<style lang="scss"></style>
