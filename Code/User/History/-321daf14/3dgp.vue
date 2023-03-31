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
<div class="max-w-[20.5rem] sm:max-w-screen-sm md:max-w-[100%] p-2 overflow-auto">
    <table class=" md:w-full  p-8 block md:table  overflow-auto whitespace-nowrap">
        <thead class="w-full bg-gray-100">
            <th class="text-left text-sm p-3">TRANSACTION</th>
            <th class="text-left text-sm p-3">DATE & TIME</th>
            <th class="text-left text-sm p-3">AMOUNT</th>
            <th class="text-left text-sm p-3">STATUS</th>
        </thead>
        <tbody class="w-full">
            <tr class="rounded-2xl " v-for="item in transactions">
                <td class="text-left p-3 text-sm ">{{ item.title }} <b>{{ item.name }}</b></td>
                <td class="text-left p-3 text-sm ">{{ item.date }}</td>
                <td class="text-left p-3 text-sm">{{ item.amount }}</td>
                <td class="text-left p-3 "><Badge :rounded="false" :content="item.status" :badge-config="badgesTypes[item.status]"></Badge></td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<style>
tr:nth-child(even) {
  background-color: rgb(243 244 246);
  border-top-right-radius: 1rem;
}
td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}
</style>