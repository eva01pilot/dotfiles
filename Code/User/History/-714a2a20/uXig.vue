<script setup lang="ts">
import { ref } from 'vue';

const checked = ref({
    ahunter: true,
    dadata: false
})

const values = ref({
    ahunter: '',
    dadata: ''
})

type API = 'dadata'|'ahunter'

const changeApiKeys = (api:API, event:any) =>{
    const value = event.target.value
    values.value[api] = value
}
const switchApi = (api:API, event:boolean) =>{
    switch(api){
        case 'ahunter': {
            checked.value['ahunter'] = event
            checked.value['dadata'] = !event
            break
        }
        case 'dadata':{
            console.log(event, api)
            checked.value['dadata'] = event
            checked.value['ahunter'] = !event
            break
        }
    }
}
</script>
<template>
    <h1>Приложение Поле ФИО</h1>
    <a-input @change="changeApiKeys('ahunter', $event)">
        <template #addonBefore>
            <h1 class="w-20">ahunter</h1>
        </template>
        <template #addonAfter>
            <a-switch @change="switchApi('ahunter', $event)" v-model:checked="checked['ahunter']"/>
        </template>
    </a-input>
    <a-input @change="changeApiKeys('dadata', $event)">
        <template #addonBefore>
            <h1 class="w-20">dadata</h1>
        </template>
        <template #addonAfter>
            <a-switch @change="switchApi('dadata', $event)" v-model:checked="checked['dadata']"/>
        </template>
    </a-input>
    <a-button>Сохранить настройки</a-button>

</template>