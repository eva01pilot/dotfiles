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
        <div id="graph" class="bg-white w-[90%] md:w-auto  rounded-xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <Chart />
        </div>
        <div id="customers" class="bg-white w-[90%] md:w-auto rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="items" heading="Latest Customers" />
        </div>
        <div id="products" class="bg-white w-[90%] md:w-auto rounded-xl  shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="products" heading="Top Products "/>
        </div>
        <div id="transactions" class="bg-white w-[90%] md:w-auto rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <TableTransactions :transactions="transactions" />
        </div>
        <div id="foot" class="bg-white  rounded-xl  shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)] mb-20">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsam nisi repellat. Nemo, quod incidunt dolor, asperiores necessitatibus odio debitis temporibus dicta aliquam cum, enim illo tenetur libero nobis facere modi. Harum doloremque laboriosam iste eaque officia sint saepe obcaecati non itaque reiciendis maiores perferendis inventore quibusdam eum veritatis totam ea quis dicta, soluta pariatur. Consectetur nobis cumque minima molestias in porro neque dolore maiores, iste sequi aliquam tempore quae enim blanditiis delectus similique nemo pariatur ipsam ea reprehenderit perferendis quis! Quam odio nesciunt, esse deleniti nam molestiae quibusdam nostrum eum nisi eveniet quaerat voluptate provident ullam, quo rerum iure obcaecati nihil cumque sit iusto, sunt rem. Velit dignissimos asperiores alias. Cumque fugiat dolores perferendis laboriosam eius nisi saepe, architecto nobis, hic voluptatem nemo dignissimos alias. At, est quod dolorem velit necessitatibus dolorum vero numquam eum atque dolore eos nemo odio aliquid deserunt voluptatem similique eveniet assumenda quasi consequatur earum.
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