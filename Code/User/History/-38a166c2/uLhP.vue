<script setup lang="ts">
import { onMounted, ref } from 'vue';
import locale from  'ant-design-vue/es/locale/ru_RU'
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
  <a-config-provider :locale="locale">
    <Marketplace v-if="placement==='DEFAULT'"/>
    <Field v-if="placement && placement!=='DEFAULT'" />
  </a-config-provider>
</template>

<style scoped>
</style>
