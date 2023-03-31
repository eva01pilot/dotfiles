<script setup lang="ts">
const props = defineProps<{
    content: string|number,
    badgeConfig: 'red' | 'gray' | 'green' | 'blue'
}>()
</script>
<template>
    <div >
    {{ props.content }}
    </div>
</template>