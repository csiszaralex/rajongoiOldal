<template>
  <div class="container-fluid">
    <h1 class="display-4 text-center p-5">Készítők</h1>
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
</template>

<script>
import keszitokCard from '../components/keszitok/keszitokCard';
export default {
  Components: [keszitokCard],
  data() {
    return {
      keszitok: [
        {
          kepForras: '@/assets/img/BB_pic.jpg',
          nev: 'Borbély Bálint',
          szerep: 'Frontend',
          feladat: ['Design (bocsi)', 'Javascript kódolás', 'Szólni Alexnak ha új pull request van']
        },
        {
          kepForras: '@/assets/img/CSA_pic.jpg',
          nev: 'Csiszár Alex Gergő',
          szerep: 'Backend',
          feladat: [
            'Adatbázis elkészítése',
            'API leprogramozása',
            'Weboldal működéséhez szükséges háttér biztosítása'
          ]
        },
        {
          kepForras: '@/assets/img/KR_pic.jpg',
          nev: 'Kardos Raul',
          szerep: 'Frontend',
          feladat: ['Design (bocsi)', 'Javascript kódolás', 'Alex képének méretre vágása']
        }
      ]
    };
  }
};
</script>
