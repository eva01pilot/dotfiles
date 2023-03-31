<script setup lang="ts">
const props = defineProps<{
    content: string|number,

}>()
</script>
<template>
    <div >
    {{ props.content }}
    </div>
</template>