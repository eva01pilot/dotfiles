<script setup lang="ts">
import { BellIcon } from "@heroicons/vue/24/solid";
</script>
<template>
    <nav class="w-full flex flex-row items-center justify-between p-[8px_16px] border-b border-b-gray-200">
        <div class="flex flex-row items-center w-1/3 justify-between">
            <img src="/Logo.svg" />
            <input class="w-4/5 border rounded-xl py-[6.5px] px-[7.5px] bg-gray-50 border-gray-200" placeholder="Search"/>
        </div>
        <div class="flex flex-row items-center ">
            <BellIcon class="h-6 w-6 text-black" />
            <img src="/Avatar.png" class="rounded-full p-4" width="32"/>
        </div>
    </nav>
</template>