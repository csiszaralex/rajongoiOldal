<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8 row">
        <div v-for="adat in adatok" :key="adat._id" class="col-sm-6 card">
          <bongeszes-card
            :id="adat._id"
            :tipus="adat.tipus"
            :cim="adat.cim"
            :hossz="adat.hossz"
            :kiadas="adat.kiadas"
            :szavazatok="adat.votes"
            @vote="vote"
            @del="del"
          ></bongeszes-card>
        </div>
      </div>
      <div class="col-lg-4">
        <h3 class="display-4 mt-5">Hozzáadás:</h3>
        <p class="lead m-2">Típus:</p>
        <input v-model="tipus" type="number" class="m-2 form-control" />
        <p class="lead m-2">Cím:</p>
        <input v-model="cim" type="text" class="m-2 form-control" />
        <p class="lead m-2">Hossz:</p>
        <input v-model="hossz" type="number" class="m-2 form-control" />
        <p class="lead m-2">Kiadás:</p>
        <input v-model="kiadas" type="number" class="m-2 form-control" />
        <input
          @click="hozzaad"
          type="button"
          class="m-2 btn btn-outline-success"
          value="Hozzáadás"
          id="btnNew"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import BongeszesCard from '../components/bongeszes/BongeszesCard';
export default {
  components: { BongeszesCard },
  setup() {
    //*Hozzáadás
    const tipus = ref('');
    const cim = ref('');
    const hossz = ref('');
    const kiadas = ref('');
    function hozzaad() {
      axios
        .post('http://localhost:5000/api', {
          tipus: tipus.value,
          cim: cim.value,
          hossz: hossz.value,
          kiadas: kiadas.value
        })
        .then(function() {
          lekerdez();
          console.log('kész');
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    //*Lekérdezés
    let adatok = ref({});
    lekerdez();
    function lekerdez() {
      axios
        .get('http://localhost:5000/api?_votes=desc', {})
        .then(function(response) {
          adatok.value = response.data;
        })
        .catch(console.error);
    }
    //*Szavaz
    function vote(id, newVote) {
      axios
        .patch(`http://localhost:5000/api/${id}`, {
          votes: newVote
        })
        .then(()=> {
          lekerdez();
        })
        .catch(console.error);
    }
    //*Töröl
    function del(id) {
      axios
        .delete(`http://localhost:5000/api/?_id=${id}`)
        .then(function() {
          lekerdez();
        })
        .catch(console.error);
    }
    return { tipus, cim, hossz, kiadas, hozzaad, adatok, vote, del };
  }
};
</script>
