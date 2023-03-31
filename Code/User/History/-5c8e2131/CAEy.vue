<script setup lang="ts">
import bitrix from '../bitrix';
import bx24 from 'bx24-api'
import { onMounted, ref, reactive } from 'vue';
import { debounce } from 'lodash';
import { vElementVisibility } from '@vueuse/components'

const dadataURL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio"
const ahunterURL = "https://ahunter.ru/site/suggest/person"
const token = ref('')
const usedAPI = ref('')
const value = ref('')
const btnText = ref('Сохранить')
const inputFocused = ref(false)
const blurText = ref('(Не сохранено)')
const isFinalRes = ref(false)
const open = ref(false)
const metaData = ref<{
        gender?: number,
        firstName: string,
        secondName: string,
        patronym: string
    }>({
        firstName: '',
        secondName: '',
        patronym: '',
        gender: 0
    })
const options = ref<{
    value: string,
    meta: {
        gender?: number,
        firstName: string,
        secondName: string,
        patronym: string
    }
}[]>()

const genderMap = reactive<{
    MALE: number,
    FEMALE: number,
    OTHER: number
}>({
    MALE: 0,
    FEMALE: 0,
    OTHER: 0
})


const getAhunterURL = (query: string) =>{
    return `${ahunterURL}?output=json;query=${query};personlim=4s`
}
const getAhunterGenderURL = (query: string) => {
    return `
https://ahunter.ru/site/cleanse/person?user=${token.value};output=json;query=${query}
`
}
const onSelect = (val:any, meta:any) =>{
    console.log('select');
    
    open.value = true
    const { firstName, secondName, patronym } = meta.meta
    value.value = `${secondName??''} ${firstName??''} ${patronym??''}`
    metaData.value = meta.meta
    setTimeout(() => {
        options.value = []
    }, 1000);
    //open.value = true
    
}
const onSearch =  debounce(async(query: string) =>{
    isFinalRes.value = false
    if(usedAPI.value==='ahunter'){
        const res = await fetch(getAhunterURL(query))
        const suggestionsJSON = await res.json()
        const suggestions = suggestionsJSON.suggestions
        console.log(suggestions)
        if(!suggestions || !suggestions.length) {
            metaData.value = {
                firstName: '',
                patronym: '',
                secondName: '',
                gender: genderMap['OTHER']
            }
            console.log(metaData.value)
            return
        }
        options.value = suggestions.map((data:any)=>({
            value: data.value,
            meta:{
                gender: genderMap[data.gender as 'MALE' | 'FEMALE'] ?? genderMap['OTHER'],
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
        if(!suggestions.suggestions && !suggestions.suggestions.length){
             metaData.value = {
                firstName: '',
                patronym: '',
                secondName: '',
                gender: genderMap['OTHER']
            }
            console.log(metaData.value)
            return
        }
        suggestions.suggestions.length = 4
        const suggestionsTrimmed = suggestions.suggestions.filter(Boolean)
        options.value = suggestionsTrimmed.map((data: any)=>({
            value: data.value,
            meta: {
                gender: genderMap[data.data.gender as 'MALE'|'FEMALE'] ?? genderMap['OTHER'],
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
    if(!value.value) return
    if(usedAPI.value === 'ahunter' && token.value){
        try{
            const res = await fetch(getAhunterGenderURL(value.value))
            const data = await res.json()
            const gender = data.persons[0].gender ?? 'OTHER'
            if(!metaData.value) return
            metaData.value.gender = genderMap[gender as 'MALE'|'FEMALE'|'OTHER']

            
        } catch(e){
            console.log(e);
            
        }
    }
    let { firstName, secondName, patronym }:any = metaData.value
    
    if(!firstName && !secondName && !patronym){
        const fioArray = value.value.split(' ')
        switch(fioArray.length){
            case 1: {
                secondName = fioArray[0]
                break
            }
            case 2: {
                secondName = fioArray[0]
                firstName = fioArray[1]
            }
            case 3: {
                secondName = fioArray[0]
                firstName = fioArray[1]
                patronym = fioArray[2]
            }
        }
    }
    console.log(firstName, secondName, patronym);
    
    const gender = metaData.value?.gender ?? genderMap['OTHER']
    console.log(gender)
    const res = await bitrix.call(`crm.${entity}.update`,{
        id: ENTITY_VALUE_ID,
        fields:{
            'NAME': firstName ?? '',
            'LAST_NAME': secondName ?? '',
            'SECOND_NAME': patronym ?? '',
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
    isFinalRes.value = true
    onBlur()
}
const onBlur = () =>{
    inputFocused.value = false
    blurText.value = isFinalRes.value ? 'Успешно сохранено' : '(Не сохранено)'
    bx24.resizeWindow(322, 30)
}
const onFocus = () =>{
    inputFocused.value = true
    
    bx24.resizeWindow(322, 180)
}

const onChangeVis = (isopen:boolean) =>{
    console.log('changeViz');
    open.value = !isopen
    console.log(open.value);
}
onMounted(async()=>{
    
    const placement = await bx24.placement.info()
    const {ENTITY_ID, ENTITY_VALUE_ID} = placement.options
    const entity = String(ENTITY_ID).split('_')[1].toLowerCase()
    const targetEntRes = await bitrix.call(`crm.${entity}.get`, {
        id: ENTITY_VALUE_ID
    })
    const targetEnt = targetEntRes.result
    value.value = `${targetEnt.LAST_NAME ?? ''} ${targetEnt.NAME ?? ''} ${targetEnt.SECOND_NAME ?? ''}`.replace(/\s+/g, ' ').trim()
    bx24.resizeWindow(322, 30)
    if(entity==='contact'){
        const res = await bitrix.app.option.get('genderFieldsContact')
        const fields = res.result
        genderMap.MALE = Number(fields[0].ID)
        genderMap.FEMALE = Number(fields[1].ID)
        genderMap.OTHER = Number(fields[2].ID)
    } 
    if(entity==='lead'){
        const res = await bitrix.app.option.get('genderFieldsLead')
        const fields = res.result
        genderMap.MALE = Number(fields[0].ID)
        genderMap.FEMALE = Number(fields[1].ID)
        genderMap.OTHER = Number(fields[2].ID)
    }
    metaData.value.firstName = targetEnt.NAME
    metaData.value.secondName = targetEnt.LAST_NAME
    metaData.value.patronym = targetEnt.SECOND_NAME
    metaData.value.gender = targetEnt['UF_CRM_NEBO_GENDER']
    blurText.value = value.value
    document.body.style.backgroundColor = '#f9fafb'
    const usedApiRes = await bitrix.app.option.get('usedApi')
    usedAPI.value = usedApiRes.result
    const tokenRes = await bitrix.app.option.get(`${usedAPI.value}ApiKey`)
    token.value = tokenRes.result
    document.addEventListener('keydown',async(e)=>{
        if(e.key==='Escape'){
            onBlur()
        }
        if(e.key==='Enter'){
            if(!options.value?.length){
                await save()
            }
        }
    })
    console.log(document.getElementsByClassName('ant-select-selection-search-input')[0]);
    
    
    

})
const logChange = () =>{
    console.log('chanmge');
    
}
</script>

<template>
    <div v-if="inputFocused" class="flex flex-col">
        <div class="p-2">
            <a-auto-complete
                ref="dropdown"
                v-model:value="value"
                :options="options"
                class="w-full z-50 isolate"
                @select="onSelect"
                @search="onSearch"
                @focus="()=>inputFocused = true"
                @dropdownVisibleChange = "onChangeVis"
                @change="logChange"
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