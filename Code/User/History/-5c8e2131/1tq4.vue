<script setup lang="ts">
import bitrix from '../bitrix';
import bx24 from 'bx24-api'
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
const dadataURL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
const ahunterURL = "http://ahunter.ru/site/suggest/person"
const token = ref('')
const usedAPI = ref('')
const value = ref('')
const btnText = ref('Сохранить')
const inputFocused = ref(false)
const blurText = ref('(Не сохранено)')
const metaData = ref<{
        gender?: number,
        firstName: string,
        secondName: string,
        patronym: string
    }>()
const options = ref<{
    value: string,
    meta: {
        gender?: number,
        firstName: string,
        secondName: string,
        patronym: string
    }
}[]>()

const getAhunterURL = (query: string) =>{
    return `${ahunterURL}?output=json;query=${query};personlim=4s`
}

const onSelect = (val:any, meta:any) =>{
    const { firstName, secondName, patronym } = meta.meta
    value.value = `${secondName??''} ${firstName??''} ${patronym??''}`
    metaData.value = meta.meta
    
}
const onSearch = debounce(async(query: string) =>{
    
    if(usedAPI.value==='ahunter'){
        const res = await fetch(getAhunterURL(query))
        const suggestionsJSON = await res.json()
        const suggestions = suggestionsJSON.suggestions
        if(!suggestions) return
        options.value = suggestions.map((data:any)=>({
            value: data.value,
            meta:{
                gender: data.gender,
                firstName: data.first_name,
                secondName: data.last_name,
                patronym: data.patronym
            }
        }))
    }
    if(usedAPI.value==='dadata'){
        const res = await fetch(dadataURL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token.value
            },
            body: JSON.stringify({query: query})
        })
        const suggestions = await res.json()
        suggestions.suggestions.length = 4
        const suggestionsTrimmed = suggestions.suggestions
        options.value = suggestionsTrimmed.map((data: any)=>({
            value: data.value,
            meta: {
                gender: data.data.gender,
                firstName: data.data.name, 
                secondName: data.data.surname,
                patronym: data.data.patronymic
            }
        }))
    }
}, 500)
const save = async() =>{
    const placement = await bx24.placement.info()
    const {ENTITY_ID, ENTITY_VALUE_ID} = placement.options
    const entity = String(ENTITY_ID).split('_')[1].toLowerCase()
    const { firstName, secondName, patronym, gender }:any = metaData.value

    const res = await bitrix.call(`crm.${entity}.update`,{
        id: ENTITY_VALUE_ID,
        fields:{
            'NAME': firstName,
            'LAST_NAME': secondName,
            'SECOND_NAME': patronym,
            'UF_CRM_NEBO_GENDER': gender
        }
    })
    if(res.result===true){
        btnText.value = 'Успешно сохранено'
        blurText.value = 'Успешно сохранено'
        setTimeout(()=>{
            btnText.value = 'Сохранить'
        }, 1500)
    }
    
}
const onBlur = () =>{
    inputFocused.value = false
    blurText.value = '(Не сохранено)'
    bx24.resizeWindow(322, 30)
}
const onFocus = () =>{
    inputFocused.value = true
    bx24.resizeWindow(322, 180)
}
onMounted(async()=>{
    const usedApiRes = await bitrix.app.option.get('usedApi')
    usedAPI.value = usedApiRes.result
    const tokenRes = await bitrix.app.option.get(`${usedAPI.value}ApiKey`)
    token.value = tokenRes.result
    document.addEventListener('keydown',(e)=>{
        console.log(e.key)
        if(e.key==='Escape'){
            onBlur()
        }
    })

})

</script>

<template>
    <div v-if="inputFocused" class="flex flex-col">
        <div class="p-2">
            <a-auto-complete
                v-model:value="value"
                :options="options"
                class="w-full"
                @select="onSelect"
                @search="onSearch"
                @focus="()=>inputFocused = true"
                placeholder="Введите ФИО"/>
        </div>
        <div class="p-2 flex flex-row self-end">
            <div class="pr-1">
                <button @click="save" class="bg-[#bbed21] rounded-sm text-[#535c69] p-[8px_20px] font-[600]">
                    {{ btnText }}
                </button>
            </div>
            <div class="pl-1">
                <button  @click="onBlur" class="bg-[#cc1c00] rounded-sm text-[#fff] p-[8px_20px] font-[600]">
                    Отменить
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <button @click="onFocus">
            {{ blurText }}
        </button>
    </div>
</template>