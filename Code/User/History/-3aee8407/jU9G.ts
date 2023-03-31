import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {AutoComplete, Input} from 'ant-design-vue'
createApp(App).use(AutoComplete).use(Input).mount('#app')
