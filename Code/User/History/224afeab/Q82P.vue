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
            <div class="flex-row flex w-full">
                <input class="border p-4 w-full" id="password" :type="passType"/>
                <input type="checkbox p-4" @click="()=>passType = passType==='password' ? 'text' : 'password'">
            </div>
        </div>
        <button class="p-2 bg-cyan-900 text-white">Войти</button>
    </form>
</main>
</template>