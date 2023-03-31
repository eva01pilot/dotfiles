<script setup lang="ts">
interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string
}
defineProps<ListItem>()
</script>

<template>
    <li class="flex flex-row justify-between border-b border-b-gray-200 p-2">
        <div class="grid grid-cols-[2fr_5fr]">
            <img class="rounded-full" width="45" v-if="avatar" :src="avatar"/>
            <div class="flex flex-col ">
                <span>{{ title }}</span>
                <span>{{ subtitle }}</span>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center">
            <span>{{ value }}</span>
            <span v-if="suffix">{{ suffix }}</span>
        </div>
    </li>
</template>