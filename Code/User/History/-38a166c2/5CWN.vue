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
  if (inFrame()) {
    setInterval(fixWindow, 500);
  }
   
})
const fixWindow = () => {
  try {
    const q = window.name.split("|");
    const domain = q[0].replace(/:(80|443)$/, "");
    const protocol = parseInt(q[1]) && true || false;
    const app_sid = q[2];
    parent.postMessage("resizeWindow:" + JSON.stringify({
      "width": "100%",
      "height": Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    }) + "::" + app_sid, "http" + (protocol ? "s" : "") + "://" + domain);
  }
  catch (e) {
    console.error("resizeWindow", e);
  }
};
const inFrame = () => {
  return !!window.name;
}
</script>

<template>
  <a-config-provider :locale="locale">
    <Marketplace v-if="placement==='DEFAULT'"/>
    <Field v-if="placement && placement!=='DEFAULT'" />
  </a-config-provider>
</template>

<style scoped>
</style>
