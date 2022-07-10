import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueGtag from "vue-gtag"; 

createApp(App)
    .use(router)
    .use(VueGtag, {
        config: { id: "G-7QZT9Q1WFR"}
    }).mount('#app')
