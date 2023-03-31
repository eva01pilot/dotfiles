<script setup lang="ts">
import Badge from './badge.vue';

interface transaction{
    title: string,
    date: string,
    amount: string,
    name: string,
    status: 'Completed' | 'Cancelled' | 'In progress'
}
const props = defineProps<{
    transactions: transaction[]
}>()
const badgesTypes: {[key:string]: 'green'|'red'|'blue'} = {
    'Completed': 'green',
    'Cancelled': 'red',
    'In progress': 'blue',
}
</script>
<template>
<div class="max-w-xs sm:max-w-screen-sm md:max-w-[100%]  overflow-auto">
    <table class=" md:w-full  p-4 block md:table  overflow-auto whitespace-nowrap">
        <thead class="w-full">
            <th class="text-left text-sm p-3">TRANSACTION</th>
            <th class="text-left text-sm p-3">DATE & TIME</th>
            <th class="text-left text-sm p-3">AMOUNT</th>
            <th class="text-left text-sm p-3">STATUS</th>
        </thead>
        <tbody class="w-full">
            <tr v-for="item in transactions">
                <td class="text-left p-3 text-sm">{{ item.title }} <b>{{ item.name }}</b></td>
                <td class="text-left p-3 text-sm">{{ item.date }}</td>
                <td class="text-left p-3 text-sm">{{ item.amount }}</td>
                <td class="text-left p-3 text-sm"><Badge :rounded="false" :content="item.status" :badge-config="badgesTypes[item.status]"></Badge></td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<style>
tr:nth-child(even) {
  background-color: #f2f2f2;
}</style>