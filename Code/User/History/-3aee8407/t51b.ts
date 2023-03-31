import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {AutoComplete, Input, Switch} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
createApp(App).use(AutoComplete).use(Input).use(Switch).mount('#app')
