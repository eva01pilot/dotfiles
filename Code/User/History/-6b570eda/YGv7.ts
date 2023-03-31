import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './bitrix'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { createStore } from 'vuex'

library.add(faMagnifyingGlass)

const store = createStore({
    state(){
        return {
            tokens:{
                access_token:'',
                refresh_token: '',
                expires_in: ''
            }
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
