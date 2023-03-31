import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {AutoComplete} from 'ant-design-vue'
createApp(App).use(AutoComplete).mount('#app')
