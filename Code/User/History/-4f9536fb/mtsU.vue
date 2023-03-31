<script setup lang="ts">
import ListItem from './listItem.vue';

interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string
}
defineProps<{
    items: ListItem[],
    heading: string
}>()
</script>
<template>
    <h3>{{ heading }}</h3>
    <ul>
        <li v-for="item in items">
            <ListItem :title="item.title" 
                :subtitle="item.subtitle" 
                :value="item.value" 
                :suffix="item.suffix"
                :avatar="item.avatar"
                />
        </li>
    </ul>
</template>