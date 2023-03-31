<script setup lang="ts">
const props = defineProps<{
    content: string|number,
    badgeConfig: 'red' | 'gray' | 'green' | 'blue'
}>()

</script>
<template>
    <div v-if="badgeConfig==='red'" class="bg-red-200 text-red-800">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig==='blue'" class="bg-blue-200 text-blue-800">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig==='green'" class="bg-green-200 text-green-800">
        {{ props.content }}
    </div>
    <div v-else-if="badgeConfig==='gray'" class="bg-gray-200 text-gray-800">
        {{ props.content }}
    </div>
</template>