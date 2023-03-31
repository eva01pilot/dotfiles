<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Dashboard from './components/dashboard.vue';
import Leftbar from './components/leftbar.vue';
import Topbar from './components/topbar.vue';

const screenWidth = ref(0)
const isDesktop = computed({ get: () => screenWidth.value > 768, set: () => { } })
const isNavOpen = ref(false)
onMounted(() => {
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    if (screenWidth.value > 768) {
      isNavOpen.value = true
    }
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', () => { })
})
const onNavOpen = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<template>
  <Topbar @navOpen="onNavOpen" :isBurgerNav="!isDesktop"
    class="fixed left-0 right-0 h-[66.5px] top-0 z-50 bg-white md:static overflow-hidden" />
  <main class="grid md:grid-cols-[1fr_4fr] grid-cols-1 relative md:static mt-[66.5px] md:mt-0">
    <Leftbar v-if="isNavOpen ?? isDesktop" class="overflow-hidden absolute md:static bg-white" />
    <section class="p-4 bg-[#F9FAFB] overflow-auto ">
      <Dashboard />
    </section>
  </main>
</template>

<style scoped></style>
