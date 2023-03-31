<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bx24 from 'bx24-api'
import Marketplace from './screens/Marketplace.vue'
import Field from './screens/Field.vue'
const placement = ref('')
onMounted(async()=>{
  const plRes = await bx24.placement.info()
  placement.value = plRes.placement 
  console.log('pl', placement.value)
})
</script>

<template>
  <Marketplace v-if="placement==='DEFAULT'"/>
  <Field v-if="placement && placement!=='DEFAULT'" />
</template>

<style scoped>
</style>
