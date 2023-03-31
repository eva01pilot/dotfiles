<script setup lang="ts">
import { BellIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";

const showIcon = ref(true)
const search = ref('')
showIcon.value = search.value.length === 0

</script>
<template>
    <nav class="w-full flex flex-row items-center justify-between p-[8px_16px] border-b border-b-gray-200">
        <div class="flex flex-row items-center w-1/3 justify-between">
            <img src="/Logo.svg" />
            {{ showIcon }}
            <div class="relative md:w-4/5 md:block hidden">
                <input :value="search" @input="(e)=>{
                        search=(e.target as HTMLInputElement).value
                        showIcon = search.length === 0 
                    }"
                    class="relative md:w-4/5 border rounded-xl py-[6.5px] px-[7.5px] bg-gray-50 border-gray-200"
                    placeholder="" />
                <div v-if="showIcon" @click="()=>showIcon = false" class="absolute inset-2 flex flex-row items-center p-2">
                    <img src="/Search.svg" class=" text-gray-500" />
                    <span class="text-gray-500 p-2">Search</span>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center ">
            <div class="p-2">
                <BellIcon class="h-8 w-8 text-black" />
            </div>
            <img src="/Avatar.png" class="rounded-full" width="48" />
        </div>
    </nav>
</template>