import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index.js';

// import Landing from '../views/Landing.vue';

const routes = [
  // { path: '/', name: 'Home', component: Landing, meta: { requiresUnauth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//* Esetleges login 
router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    //next(false); //. Letiltja
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
    next('/');
  } else next();
});

export default router;
