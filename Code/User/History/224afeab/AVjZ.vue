<script setup lang="ts">
import { ref } from 'vue';

const passType = ref('password')

</script>
<template>
<main class="flex justify-center items-center w-full h-[100svh]">
    <form class="flex flex-col justify-between w-4/5 md:w-2/5">
        <div class="py-2 flex flex-col">
            <label for="login">Логин</label>
            <input class="border p-4" id="login" type="text"/>
        </div>
        <div class="py-2 pb-4 flex flex-col">
            <label for="password">Пароль</label>
            <input class="border p-4 w-full" id="password" :type="passType"/>
        </div>
        <label for="showpass">Показать пароль</label>
        <input id="showpass" type="checkbox" class="w-full p-2" @click="()=>passType = passType==='password' ? 'text' : 'password'">
        <button class="p-2 bg-cyan-900 text-white">Войти</button>
    </form>
</main>
</template>