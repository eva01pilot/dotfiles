<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bitrix from './bitrix';
import bx24 from 'bx24-api'
import Marketplace from './screens/Marketplace.vue'
import Field from './screens/Field.vue'
const placement = ref('')
onMounted(async()=>{
  const plRes = await bx24.placement.info()
  placement.value = plRes.placement 

})
</script>

<template>
  <Marketplace v-if="placement==='DEFAULT'"/>
  <Field v-else />
</template>

<style scoped>
</style>
