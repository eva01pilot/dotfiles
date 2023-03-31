<script setup lang="ts">
import ListItem from './listItem.vue';
import { LockClosedIcon, ChartPieIcon, DocumentChartBarIcon, ShoppingBagIcon, InboxArrowDownIcon } from "@heroicons/vue/24/solid";

</script>

<template>
  <section>
    <div class="p-4">
        <ul class="grid gap-4 border-b-gray-200 border-b">
            <ListItem active :icon="ChartPieIcon">
                <template #Title>
                    Overview
                </template>
            </ListItem>
            <ListItem active :dropdown-items="['Cobol', 'Haskell', 'AlpineJS', 'Docker']"  :icon="DocumentChartBarIcon">
                <template #Title>
                    Pages
                </template>
            </ListItem>
            <ListItem active :dropdown-items="['Cobol', 'Haskell', 'AlpineJS', 'Docker']"  :icon="ShoppingBagIcon">
                <template #Title>
                    Sales
                </template>
            </ListItem>
            <ListItem active badge-rounded :notify-quantity="1" :icon="InboxArrowDownIcon">
                <template #Title>
                    Messages
                </template>
            </ListItem>
            <ListItem active :dropdown-items="['Cobol', 'Haskell', 'AlpineJS', 'Docker']" :icon="LockClosedIcon">
                <template #Title>
                    Authentication
                </template>
            </ListItem>
        </ul>
    </div>
    <div>
        
    </div>
  </section>  
</template>