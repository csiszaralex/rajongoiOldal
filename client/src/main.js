import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//-Componensek
//* Amit több lapon is használsz azt ide 
// import BaseInput from './components/UI/BaseInput.vue';

const app = createApp(App);

app.use(store);
app.use(router);

//-Componens use
// app.component('base-input', BaseInput);
//app.component('base-card', BaseCard);

app.mount('#app');
