import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount("#app");

// Links
// https://itnext.io/vuex-made-simple-getting-started-6bf229d432cf
// https://medium.com/dailyjs/mastering-vuex-zero-to-hero-e0ca1f421d45
// https://www.thepolyglotdeveloper.com/2018/04/vuejs-app-using-axios-vuex/
// https://glebbahmutov.com/blog/vue-vuex-rest-todomvx/
// https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/
