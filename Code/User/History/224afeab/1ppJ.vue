<script setup lang="ts">
import { ref } from 'vue';

const passType = ref('password')

const onLogin = (e:Event) =>{
    e.preventDefault()
    const target = e.target as HTMLFormElement
    console.log(target.nodeValue)
}
</script>
<template>
<main class="flex justify-center items-center w-full h-[100svh]">
    <form @submit="onLogin" class="flex flex-col justify-between w-4/5 md:w-2/5">
        <div class="py-2 flex flex-col">
            <label for="login">Логин</label>
            <input name="login" class="border p-4" id="login" type="text"/>
        </div>
        <div class="py-2 pb-4 flex flex-col">
            <label for="password">Пароль</label>
            <input name="password" class="border p-4 w-full" id="password" :type="passType"/>
        </div>
        <div class="flex flex-row py-4 text-lg">
            <input id="showpass" type="checkbox" class=" p-2" @click="()=>passType = passType==='password' ? 'text' : 'password'">
            <label for="showpass">Показать пароль</label>
        </div>
        <button type="submit" class="p-2 bg-cyan-900 text-white">Войти</button>
    </form>
</main>
</template>