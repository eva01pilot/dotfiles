<script setup lang="ts">
import ListItem from './listItem.vue';

interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix: string
}
const props = defineProps<{
    items: ListItem[],
    heading: string
}>()
</script>
<template>
    <h3>{{ heading }}</h3>
    <ul>
        <li v-for="item in items">
            <ListItem title="Neil Sims" subtitle="email@example.com" value="$367"/>
        </li>
    </ul>
</template>