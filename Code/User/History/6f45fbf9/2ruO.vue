<script setup lang="ts">
import type { Component } from 'vue';
import { ref } from 'vue'
import Badge from './badge.vue'
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    notifyQuantity?: number,
    icon: Component,
    active: boolean,
    badgeConfig?: 'red' | 'gray' | 'green' | 'blue'
    badgeRounded?: boolean,
    dropdownItems?: string[]
}>()
const open = ref(false)
</script>
<template>
    <li class=" ">
        <div class="grid grid-cols-[1fr_3fr]">
            <div class="flex justify-center items-center">
                <i class="w-8 h-8"><component :is="props.icon" /></i>
            </div>
            <div class="flex justify-start items-center text-left flex-row">
                <slot name="Title"></slot>
            </div>
            <div class="flex flex-row justify-center items-center">
                <div v-if="notifyQuantity" class="flex justify-center items-center">
                    <Badge :rounded="badgeRounded??false" :badge-config="badgeConfig?? 'red'"  :content="notifyQuantity"/>
                </div>
                <div v-if="dropdownItems?.length" class="flex justify-center items-center">
                    <ChevronDownIcon class="h-6" v-if="!open" @click="()=>open = true"/>
                    <ChevronUpIcon class="h-6" v-else @click="()=>open = false"/>
                </div>
            </div>
        </div>
        <div class="col-span-3 " v-if="dropdownItems?.length">
            <ul class="ml-10 " v-if="open" v-for="item in dropdownItems">
                <li class="p-2">
                    {{ item }}
                </li>
            </ul>
        </div>
    </li>
</template>