<template>
  <div>
    <img class="card-img-top" :src="forras" alt="BB" />
    <div class="card-body">
      <h4 class="card-title mb-1">{{ nev }}</h4>
      <p class="card-subtitle text-muted mb-4">{{ szerep }}</p>
      <ul v-for="valami in feladat" :key="valami" style="list-style-type: none;" class="px-0">
        <li class="card-text mt-2">{{ valami }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['forras', 'nev', 'szerep', 'feladat']
};
</script>
