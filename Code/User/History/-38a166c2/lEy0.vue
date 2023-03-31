<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bitrix from './bitrix';
import bx24 from 'bx24-api'
const placement = ref('')
onMounted(async()=>{
  console.log(await bx24.placement.info())

})
</script>

<template>
  
</template>

<style scoped>
</style>
