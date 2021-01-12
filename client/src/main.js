import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';

//-Componensek

const app = createApp(App);

// app.use(store);
app.use(router);

//-Componens use

app.mount('#app');
