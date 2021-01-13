<template>
  <div class="card-body row" :class="classes">
    <div class="col-xl-3 col-lg-12 col-md-3 my-auto display-2">{{ srsz + 1 }}</div>
    <div class="col-xl-9 col-md-9 col-lg-12">
      <h5 class="card-title text-bold">
        {{ cim }}
      </h5>
      <p class="card-subtitle">
        {{ kiadas }},
        {{ type }}
      </p>
      <p class="card-text">
        {{ length }} <br />
        <strong>{{ szavazatok }} szavazat</strong>
      </p>
      <button
        type="button"
        class="btn btn-success vote"
        :class="{ disabled: voted }"
        :id="id"
        @click="vote"
      >
        {{ massage }}
      </button>
      <button type="button" @click="del" class="btn btn-outline-danger mx-4 px-4" :id="id">
        Törlés
      </button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
export default {
  props: ['id', 'tipus', 'cim', 'hossz', 'kiadas', 'szavazatok', 'srsz', 'voted'],
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
    const classes = computed(() => {
      switch (props.srsz) {
        case 0:
          return 'first';
        case 1:
          return 'sec';
        case 2:
          return 'third';
        default:
          return '';
      }
    });
    const massage = computed(() => {
      return props.voted ? 'Már szavaztál' : 'Szavazás';
    });
    return { type, length, vote, del, classes, massage };
  }
};
</script>
<style lang="scss" scoped>
.first {
  background-color: gold;
}
.sec {
  background-color: silver;
}
.third {
  background-color: orange;
}
</style>
