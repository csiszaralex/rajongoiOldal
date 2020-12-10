<template>
  <div class="csudijo">
    <!-- Fejléc -->
    <header id="fejlec">
      <div class="container-fluid h-50">
        <div class="row h-50 align-items-center">
          <div class="col-12 text-center">
            <h1>Csudijó Étterem</h1>
            <p class="motto">Ahol az ízek életre kelnek</p>
          </div>
        </div>
      </div>
    </header>
    <!-- Rólunk -->
    <div class="container">
      <!-- Étlap -->
      <section id="etlap" class="szurke-hatter">
        <h2>Ízelítő étlapunkról</h2>
        <!-- Étel kártyák -->
        <div class="row">
          <div v-for="food in this.$store.getters.foods" :key="food._id" class="col-sm-12 col-md-6 col-xl-4">
            <div class="card">
              <img v-if="food.pictureUrl" class="card-img-top" :src="food.pictureUrl" />
              <div class="card-body">
                <h4 class="card-title">{{ food.foodName }} ({{ food.numberOfVote }}sz.)</h4>
                <p v-if="food.description" class="card-text">
                  {{ food.description.length > 450 ? food.description.substring(0, 450) + "..." : food.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <TopFoodsComp />
    <EtelkezeloComp />
  </div>
</template>

<script lang="ts">
import EtelkezeloComp from "@/components/EtelkezeloComp.vue";
import TopFoodsComp from "@/components/TopFoodsComp.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    EtelkezeloComp,
    TopFoodsComp
  }
})
export default class CsudijoView extends Vue {}
</script>

<style scoped>
nav {
  font-weight: 500;
}
#fejlec {
  min-height: 100px;
  background-image: url("./kepek/etterem.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
}
h1 {
  font-size: 3em;
  font-weight: 300;
}
section {
  padding: 15px 15px 15px 15px;
  margin-bottom: 15px;
}
a:link,
a:visited {
  color: rgb(236, 236, 236);
}
a:hover,
a:active {
  color: white;
  text-decoration: none;
}
.card {
  height: 100% !important;
}
.szurke-hatter {
  background-color: rgb(236, 236, 236);
}
html,
body {
  line-height: 1.8;
}
p {
  font-weight: 300;
}
.motto {
  font-size: 1em;
}
#rolunk img {
  max-width: 100%;
}

.card-img-top {
  width: 100%;
  height: 30vh;
  object-fit: cover;
}
</style>
