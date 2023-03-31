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
const addFields = async() =>{
        await bitrix.call('userfieldtype.add',{
            USER_TYPE_ID: 'NEBO_FIO',
            HANDLER: 'http://127.0.0.1:5173/',
            TITLE: 'Поле ФИО',
            DESCRIPTION: 'Поле с подсказками по ФИО'
        })
        await bitrix.call('crm.lead.userfield.add', {
            fields: {
                    "FIELD_NAME": "NEBO_FIO",
                    "EDIT_FORM_LABEL": "Поле ФИО",
                    "LIST_COLUMN_LABEL": "Поле ФИО",
                    "USER_TYPE_ID": "NEBO_FIO",
                    "XML_ID": "NEBO_FIO",
                }
        })
        await bitrix.call('crm.contact.userfield.add', {
            fields: {
                    "FIELD_NAME": "NEBO_FIO",
                    "EDIT_FORM_LABEL": "Поле ФИО",
                    "LIST_COLUMN_LABEL": "Поле ФИО",
                    "USER_TYPE_ID": "NEBO_FIO",
                    "XML_ID": "NEBO_FIO",
                }
        })
        await bitrix.call("crm.lead.userfield.add", {
            fields: {
              FIELD_NAME: "NEBO_GENDER",
              EDIT_FORM_LABEL: "Выберите гендер",
              LIST_COLUMN_LABEL: "Выберите гендер",
              USER_TYPE_ID: "enumeration",
              XML_ID: "NEBO_GENDER",
              LIST: [
                { VALUE: "Мужчина", XML_ID: "MALE" },
                { VALUE: "Женщина", XML_ID: "FEMALE" },
                { VALUE: "Иное", XML_ID: "OTHER" },
              ],
              SETTINGS: { DEFAULT_VALUE: "Мужчина" },
            },
          });
          await bitrix.call("crm.contact.userfield.add", {
            fields: {
              FIELD_NAME: "NEBO_GENDER",
              EDIT_FORM_LABEL: "Выберите гендер",
              LIST_COLUMN_LABEL: "Выберите гендер",
              USER_TYPE_ID: "enumeration",
              XML_ID: "NEBO_GENDER",
              LIST: [
                { VALUE: "Мужчина", XML_ID: "MALE" },
                { VALUE: "Женщина", XML_ID: "FEMALE" },
                { VALUE: "Иное", XML_ID: "OTHER" },
              ],
              SETTINGS: { DEFAULT_VALUE: "Мужчина" },
            },
          });
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
    
    const isUserField = await bitrix.call('userfieldtype.list') 
    if(!isUserField.result.length){
        await addFields()
    }
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
    <a-input v-model:value="values['dadata']" @change="changeApiKeys('dadata', $event)">
        <template #addonBefore>
            <h1 class="w-20">dadata</h1>
        </template>
        <template #addonAfter>
            <a-switch @change="switchApi('dadata', $event)" v-model:checked="checked['dadata']"/>
        </template>
    </a-input>
    <a-button @click="saveSettings">Сохранить настройки</a-button>

</template>