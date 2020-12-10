// import MyModule from "@/store/MyModule";
import CsudijoModule from "@/store/CsudijoModule";
import VuexDemoModule from "@/store/VuexDemoModule";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    csudijoModule: CsudijoModule,
    vuexDemoModule: VuexDemoModule
    // myModule: myModule,
  }
});
