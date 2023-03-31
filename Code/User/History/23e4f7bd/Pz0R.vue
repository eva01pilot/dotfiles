<script setup lang="ts">
import { ref } from 'vue';
import Chart from './chart.vue';
import List from './list.vue';
import TableTransactions from './tableTransactions.vue';
interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string
}
interface transaction{
    title: string,
    date: string,
    amount: string,
    name: string,
    status: 'Completed' | 'Cancelled' | 'In progress'
}
const items:ListItem[] = [
    {
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$367',
        avatar: '/Avatar.png'
    },
        {
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$367',
        avatar: '/Avatar.png'
    },
        {
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$3632423423427',
        avatar: '/Avatar.png'
    },{
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$3632423423427',
        avatar: '/Avatar.png'
    },{
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$3632423423427',
        avatar: '/Avatar.png'
    },{
        title: 'Neil Sims',
        subtitle: 'email@example.com',
        value: '$3632423423427',
        avatar: '/Avatar.png'
    }
]
const products:ListItem[] = [
    {
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    },{
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    },{
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    },{
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    },{
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    },{
        title: 'Restaurant Booking App',
        subtitle: 'React & Bootstrap Framework',
        value: '70',
        suffix: 'sales'
    }
]
const transactions: transaction[] = [{
    title: 'Payment from',
    name: 'Bonnie Green',
    date: 'Apr 23, 2021',
    amount: '$2300',
    status: 'Cancelled'
}]
</script>

<template>
    <div class="grid dashboard-grid gap-4 p-4 overflow-y-scroll  h-screen">
        <div id="graph" class="bg-white   rounded-xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <Chart />
        </div>
        <div id="customers" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="items" heading="Latest Customers" />
        </div>
        <div id="products" class="bg-white  rounded-xl  shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="products" heading="Top Products "/>
        </div>
        <div id="transactions" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <TableTransactions :transactions="transactions" />
        </div>
        <div id="foot" class="bg-white  rounded-xl  shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)] mb-20">
        </div>
    </div>
</template>
<style>
    .dashboard-grid{
        grid-template-areas: "a a a"
                             "b b b"
                             "c c c"
                             "d d d"
                             "e e e";
    }
    #graph{
        grid-area: a;
    }
    #customers{
        grid-area: b;
    }
    #products{
        grid-area: c;
    }
    #transactions{
        grid-area: d;
    }
    #foot{
        grid-area: e;
    }
    @media screen and (min-width: 768px){
        
    .dashboard-grid{
        grid-template-areas: "a a a a a"
                             "b b c c c"
                             "d d d d d"
                             "e e e e e";
    }
    #graph{
        grid-area: a;
    }
    #customers{
        grid-area: b;
    }
    #products{
        grid-area: c;
    }
    #transactions{
        grid-area: d;
    }
    #foot{
        grid-area: e;
    }
    }
</style>