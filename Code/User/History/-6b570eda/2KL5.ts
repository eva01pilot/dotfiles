import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './bitrix_login'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import store from './store'

library.add(faMagnifyingGlass)



createApp(App).use(router).use(store).mount('#app')
