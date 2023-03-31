import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {AutoComplete, Input, Switch, Button} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
createApp(App).use(AutoComplete).use(Input).use(Switch).use(Button).mount('#app')
