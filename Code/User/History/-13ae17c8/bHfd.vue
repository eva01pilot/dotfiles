<script setup lang="ts">
interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string,
    last: boolean
}
defineProps<ListItem>()
</script>

<template>
    <li :class="`flex flex-row justify-between ${!last && 'border-b border-b-gray-200'} p-2`">
        <div class="flex flex-row">
            <img class="rounded-full" width="45" v-if="avatar" :src="avatar"/>
            <div class="flex flex-col text-ellipsis">
                <span class="font-bold">{{ title }}</span>
                <span class="text-gray-900">{{ subtitle }}</span>
            </div>
        </div>
        <div class="flex flex-row items-center max-w-[3rem]">
            <span class="font-bold p-1 text-ellipsis whitespace-nowrap overflow-hidden">{{ value }}</span>
            <span class="text-gray-900" v-if="suffix">{{ suffix }}</span>
        </div>
    </li>
</template>