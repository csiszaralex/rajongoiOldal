<template>
  <div class="card-body">
    <h5 class="card-title text-bold">
      {{ cim }}
    </h5>
    <p class="card-subtitle">
      {{ kiadas }},
      {{ type }}
      <span class="text-muted">({{ tipus }})</span>
    </p>
    <p class="card-text">
      {{ length }} <br />
      <strong>{{ szavazatok }} szavazat</strong>
    </p>
    <button type="button" class="btn btn-success vote" :id="id" @click="vote">
      Szavazás
    </button>
    <button type="button" @click="del" class="btn btn-outline-danger mx-4 px-4" :id="id">
      Törlés
    </button>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  props: ['id', 'tipus', 'cim', 'hossz', 'kiadas', 'szavazatok'],
  setup(props, context) {
    const type = computed(() => {
      switch (props.tipus) {
        case 0:
          return 'Zene';
        case 1:
          return 'Film';
        case 2:
          return 'Műsor';
        case 3:
          return 'Vendégszereplés';
        default:
          return 'Hiba!';
      }
    });
    const length = computed(() => {
      let count = props.hossz;
      let back = '';
      if (count > 3600) {
        back += Math.floor(count / 3600) + ':';
        count = Math.floor(count % 3600);
      }
      if (count > 60) {
        back += (count < 600 ? '0' : '') + Math.floor(count / 60) + ':';
        count = Math.floor(count % 60);
      }
      back += (count < 10 ? '0' : '') + count + ' perc';
      return back;
    });
    function vote() {
      context.emit('vote', props.id, props.szavazatok + 1);
    }
    function del() {
      context.emit('del', props.id);
    }
    return { type, length, vote, del };
  }
};
</script>
