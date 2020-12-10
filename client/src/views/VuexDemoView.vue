<template>
  <div class="home">
    <VuexDemoComp />
  </div>
</template>

<script lang="ts">
import VuexDemoComp from "@/components/VuexDemoComp.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    VuexDemoComp
  }
})
export default class VuexDemoView extends Vue {}
</script>
