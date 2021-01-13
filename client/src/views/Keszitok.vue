<template>
  <div class="container-fluid">
    <h1 class="display-4 text-center px-5 py-3">Készítők</h1>
    <div class="row text-center" id="keszitok">
      <div v-for="keszito in keszitok" :key="keszito.nev" class="col-md-3 card m-2 px-0 text-left">
        <keszitok-card
          :forras="keszito.kepForras"
          :nev="keszito.nev"
          :szerep="keszito.szerep"
          :feladat="keszito.feladat"
        >
        </keszitok-card>
      </div>
    </div>
  </div>
</template>

<script>
import KeszitokCard from '../components/keszitok/KeszitokCard';
export default {
  components: { KeszitokCard },
  data() {
    return {
      keszitok: [
        {
          kepForras: require('@/assets/img/BB_pic.jpg'),
          nev: 'Borbély Bálint',
          szerep: 'Frontend',
          feladat: ['Design (bocsi)', 'Javascript kódolás', 'Szólni Alexnak ha új pull request van']
        },
        {
          kepForras: require('@/assets/img/CSA_pic.jpg'),
          nev: 'Csiszár Alex',
          szerep: 'Backend',
          feladat: [
            'Adatbázis elkészítése',
            'API leprogramozása',
            'Weboldal működéséhez szükséges háttér biztosítása'
          ]
        },
        {
          kepForras: require('@/assets/img/KR_pic.jpg'),
          nev: 'Kardos Raul',
          szerep: 'Frontend',
          feladat: ['Design (bocsi)', 'Javascript kódolás', 'Alex képének méretre vágása']
        }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
