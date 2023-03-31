<script setup lang="ts">
import { ref, onMounted } from 'vue';
import bitrix from '../bitrix'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface master {
    NAME: string,
    PHONE?: string
}

const search = ref('')
const blackList = ref<master>()

const oninput = (e:Event) =>{
    const target = <HTMLInputElement>e.target
    search.value = target.value
}

const requestMaster = async() =>{
    const res = await bitrix.call('client.data.get', {
        origin: window.location.host,
        phone_number: search.value.replace(/\D/g,'')
    })
    blackList.value = res.result.result
    const log = await bitrix.call('client.data.auth.get')
    console.log(log)
}
onMounted(async()=>{
    const res = await bitrix.call('client.data.auth.authenticate', {
        login: 'clienttest',
        password: '32143678bA!!!!'
    })
    console.log(res)
})
</script>
<template>
    <main class="w-screen h-[100svh] flex-col flex justify-center items-center">
        <h1 class="text-4xl mb-12 text-center">Черный Список Мастеров</h1>
        <div class="flex flex-row md:w-3/5 justify-center">
            <input class="md:w-11/12 border border-r-0 p-2 rounded-l-md" placeholder="Введите номер телефона" :value="search" @input="oninput"/>
            <button @click="requestMaster" class="md:w-1/12 p-2 rounded-r-md border"><font-awesome-icon icon="fa-magnifying-glass" /></button>
        </div>
        <section v-if="blackList" class="mt-12">
            <h2 v-if="blackList.NAME==='Мастер не найден'">Мастер не найден</h2>
            <h2 v-if="blackList.PHONE">Мастер {{ blackList.NAME }} с номером телефона {{ blackList.PHONE }} 
                <h2 class="text-red-500">в черном списке</h2>
            </h2>
        </section>
    </main>

</template>