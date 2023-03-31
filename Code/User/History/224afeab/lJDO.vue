<script setup lang="ts">
</script>
<template>
<main class="flex justify-center items-center w-full h-[100svh]">
    <form class="flex flex-col justify-between">
        <div class="py-2 flex flex-col">
            <label for="login">Логин</label>
            <input class="border" id="login" type="text"/>
        </div>
        <div class="py-2 flex flex-col">
            <label for="password">Пароль</label>
            <input class="border" id="password" type="password"/>
        </div>
        <button>Войти</button>
    </form>
</main>
</template>