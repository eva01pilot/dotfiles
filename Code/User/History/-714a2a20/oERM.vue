<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bitrix from '../bitrix';
type Checked = {
    [key: string]: boolean
}
const checked = ref<Checked>({
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
const saveSettings = async() =>{
    if(!values.value['ahunter'] && !values.value['dadata']) return
    console.log(values.value['ahunter']);
    await bitrix.app.option.set({
        'usedApi': Object.keys(checked.value).filter((key)=>checked.value[key])[0], 
        'ahunterApiKey': values.value['ahunter'],
        'dadataApiKey': values.value['dadata']
    })
}

onMounted(async()=>{
    const usedApiRes = await bitrix.app.option.get('usedApi')
    const usedApi = usedApiRes.result
    if(usedApi === 'ahunter'){
        checked.value['ahunter'] = true
        checked.value['dadata'] = false
    } else {
        checked.value['ahunter'] = false
        checked.value['dadata'] = true
    }
    const ahunterApiKeyRes = await bitrix.app.option.get('ahunterApiKey')
    values.value.ahunter = ahunterApiKeyRes.result
    
    const dadataApiKeyRes = await bitrix.app.option.get('dadataApiKey')
    values.value.dadata =  dadataApiKeyRes.result
    
    
})
</script>
<template>
    <h1>Приложение Поле ФИО</h1>
    <a-input v-model:value="values['ahunter']" @change="changeApiKeys('ahunter', $event)">
        <template #addonBefore>
            <h1 class="w-20">ahunter</h1>
        </template>
        <template #addonAfter>
            <a-switch @change="switchApi('ahunter', $event)" v-model:checked="checked['ahunter']"/>
        </template>
    </a-input>
    <a-input v-model:value="values['ahunter']" @change="changeApiKeys('dadata', $event)">
        <template #addonBefore>
            <h1 class="w-20">dadata</h1>
        </template>
        <template #addonAfter>
            <a-switch @change="switchApi('dadata', $event)" v-model:checked="checked['dadata']"/>
        </template>
    </a-input>
    <a-button @click="saveSettings">Сохранить настройки</a-button>

</template>