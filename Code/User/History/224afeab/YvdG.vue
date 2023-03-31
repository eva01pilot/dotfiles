<script setup lang="ts">
</script>
<template>
<main class="flex justify-center items-center w-full h-[100svh]">
    <form class="flex flex-col justify-between w-4/5 md:w-2/5">
        <div class="py-2 flex flex-col">
            <label for="login">Логин</label>
            <input class="border" id="login" type="text"/>
        </div>
        <div class="py-2 flex flex-col">
            <label for="password">Пароль</label>
            <input class="border" id="password" type="password"/>
        </div>
        <button class="p-2 bg-cyan-900 text-white">Войти</button>
    </form>
</main>
</template>