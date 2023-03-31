<script setup lang="ts">
import ListItem from './menuItem.vue';
import { LockClosedIcon, ChartPieIcon, DocumentChartBarIcon, ShoppingBagIcon, 
    InboxArrowDownIcon, ClipboardDocumentListIcon, LifebuoyIcon, RectangleStackIcon,
    AdjustmentsVerticalIcon, GlobeAmericasIcon, CogIcon } from "@heroicons/vue/24/solid";

</script>

<template>
    <section class="h-[calc(100svh-66.5px)] overflow-y-auto border-r-gray-200 border-r-2 z-50 flex flex-col justify-between">
        <div>
            <div class="p-4 border-b-gray-200 border-b-2 ">
                <ul class="grid gap-4 ">
                    <ListItem active :icon="ChartPieIcon">
                        <template #Title>
                            <a>Overview</a>
                        </template>
                    </ListItem>
                    <ListItem active :dropdown-items="['Cobol', 'Haskell', 'AlpineJS', 'Docker']"
                        :icon="DocumentChartBarIcon">
                        <template #Title>
                            Pages
                        </template>
                    </ListItem>
                    <ListItem active :dropdown-items="['Product List', 'Billing', 'Invoice']" :icon="ShoppingBagIcon">
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
            <div class="p-4 border-b-gray-200 ">
                <ul class="grid gap-4 ">
                    <ListItem active :icon="ClipboardDocumentListIcon">
                        <template #Title>
                            Docs
                        </template>
                    </ListItem>
                    <ListItem active :icon="RectangleStackIcon">
                        <template #Title>
                            Components
                        </template>
                    </ListItem>
                    <ListItem active :icon="LifebuoyIcon">
                        <template #Title>
                            Help
                        </template>
                    </ListItem>
                </ul>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center p-2">
            <AdjustmentsVerticalIcon class="h-8"/>
            <GlobeAmericasIcon class="h-8"/>
            <CogIcon class="h-8"/>
        </div>
    </section>
</template>