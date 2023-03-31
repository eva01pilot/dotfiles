<script setup lang="ts">
import { ref } from 'vue';
import bitrix from '../bitrix_login';
import router from '../router';
import store from '../store'

const passType = ref('password')
const login = ref('')
const password = ref('')
const error = ref(false)
const onLogin = async(e:Event) =>{
    e.preventDefault()
    const res = await bitrix.call('client.data.auth.authenticate',{
        login: login.value,
        password: password.value
    })
    if(res.result.tokens){
        store.state.tokens = res.result
        router.push('/')
    }
    if(res.result.logged===false){
        error.value = true
    }
}

</script>
<template>
<main class="flex justify-center items-center w-full h-[100svh]">
    <form @submit="onLogin" class="flex flex-col justify-between w-4/5 md:w-2/5">
        <div class="py-2 flex flex-col">
            <label for="login">Логин</label>
            <input @input="($event)=>{login = ($event.target as HTMLInputElement).value}" :value="login" name="login" class="border p-4" id="login" type="text"/>
        </div>
        <div class="py-2 pb-4 flex flex-col">
            <label for="password">Пароль</label>
            <input @input="($event)=>{password = ($event.target as HTMLInputElement).value}" :value="password" name="password" class="border p-4 w-full" id="password" :type="passType"/>
        </div>
        <div class="flex flex-row py-4 text-lg">
            <input id="showpass" type="checkbox" class=" p-2" @click="()=>passType = passType==='password' ? 'text' : 'password'">
            <label for="showpass">Показать пароль</label>
        </div>
        <p class="py-2 text-red-600" v-if="error">Неверный логин или пароль</p>
        <button type="submit" class="p-2 bg-cyan-900 text-white">Войти</button>
    </form>
</main>
</template>