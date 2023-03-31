<script setup lang="ts">
const props = defineProps<{
    content: string|number,
    color: string,
    backgroundColor: string
}>()
</script>
<template>
    <div :style="{backgroundColor, color}">
    {{ props.content }}
    </div>
</template>