<template>
  <div class="card-body">
    <h5 class="card-title">ID:</h5>
    <p class="card-subtitle text-muted">{{ id }}</p>
    <br />
    <p class="card-text">
      Típus: {{ tipus }}
      <br />
      Cím: {{ cim }}
      <br />
      Hossz: {{ hossz }}
      <br />
      Kiadás: {{ kiadas }}
      <br />
      Szavazatok: {{ szavazatok }}
    </p>
    <button type="button" class="btn btn-primary vote" :id="id">Szavazás</button>
    <button
      type="button"
      onclick="DeleteButtons(this.id)"
      class="btn vote btn-outline-danger mx-2"
      style="width:100px"
      :id="id"
    >
      Törlés
    </button>
  </div>
</template>
<script>
export default {
  props: ['id', 'tipus', 'cim', 'hossz', 'kiadas', 'szavazatok']
  //tipus, cim, hossz, kiadas, hozzaad, adatok
};
</script>
