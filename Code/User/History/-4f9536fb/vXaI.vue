<script setup lang="ts">
import ListItem from './listItem.vue';

interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string
}
const props = defineProps<{
    items: ListItem[],
    heading: string
}>()
</script>
<template>
    <div class="p-4 max-w-[calc(100vw-100px)]">
        <h3 class="p-2 text-2xl font-bold">{{ heading }}</h3>
        <ul>
            <li v-for="(item, index) in items">
                <ListItem :title="item.title"
                    :subtitle="item.subtitle"
                    :value="item.value"
                    :suffix="item.suffix"
                    :avatar="item.avatar"
                    :last="index===items.length-1"
                    />
            </li>
        </ul>
    </div>
</template>