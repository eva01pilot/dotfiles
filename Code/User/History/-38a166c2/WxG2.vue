<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bitrix from './bitrix';
const placement = ref('')
onMounted(async()=>{
  console.log(await bitrix.app.info())
})
</script>

<template>
  
</template>

<style scoped>
</style>
