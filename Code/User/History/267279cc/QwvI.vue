<script setup lang="ts">
const props = defineProps<{
    content: string | number,
    badgeConfig: 'red' | 'gray' | 'green' | 'blue'
    rounded: boolean,
}>()

</script>
<template>
    <div v-if="badgeConfig === 'red'" class="bg-red-200 max-w-[7rem] text-red-800 flex justify-center items-center "
    :style="rounded ? {borderRadius:'50%', width: '24px', height: '24px'} : {borderRadius: '8px', padding: '4px'}">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig === 'blue'" class="bg-blue-200 max-w-[7rem] text-blue-800 flex justify-center items-center "
    :style="rounded ? {borderRadius:'50%', width: '24px', height: '24px'} : {borderRadius: '8px', padding: '4px'}">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig === 'green'" class="bg-green-200 max-w-[7rem] text-green-800 flex justify-center items-center "
    :style="rounded ? {borderRadius:'50%', width: '24px', height: '24px'} : {borderRadius: '8px', padding: '4px'}">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig === 'gray'" class="bg-gray-200 max-w-[7rem] text-gray-800 flex justify-center items-center "
    :style="rounded ? {borderRadius:'50%', width: '4px', height: '4px'} : {borderRadius: '8px', padding: '4px'}">
        {{ props.content }}
    </div>
</template>