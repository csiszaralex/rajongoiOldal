import { createRouter, createWebHistory } from 'vue-router';
import Bongeszes from '../views/Bongeszes.vue';
import Fooldal from '../views/Fooldal.vue';
import Keszitok from '../views/Keszitok.vue';

const routes = [
  { path: '/', name: 'Fooldal', component: Fooldal },
  { path: '/bongeszes', name: 'Bongeszes', component: Bongeszes },
  { path: '/keszitok', name: 'Keszitok', component: Keszitok }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
