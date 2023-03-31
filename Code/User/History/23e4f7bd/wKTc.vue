<script setup lang="ts">
import { ref } from 'vue';
import Chart from './chart.vue';
import List from './list.vue';
interface ListItem {
    avatar?:string,
    title: string,
    subtitle: string,
    value: string,
    suffix?: string
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
</script>

<template>
    <div class="grid dashboard-grid gap-4 p-4 overflow-y-scroll w-full h-screen">
        <div id="graph" class="bg-white   rounded-xl p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <Chart />
        </div>
        <div id="customers" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="items" heading="Latest Customers" />
        </div>
        <div id="products" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            <List :items="products" heading="Top Products"/>
        </div>
        <div id="transactions" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            Hello
        </div>
        <div id="foot" class="bg-white  rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.06)_0px_1px_3px_rgba(0,0,0,0.1)]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eos error id nulla adipisci! Distinctio, sint? Possimus ducimus officiis placeat blanditiis, quos quis commodi voluptatum sint facere excepturi illo, eveniet debitis ea porro similique laborum magni ad. Odit sapiente ullam eaque neque quibusdam pariatur dicta unde similique voluptas earum illo consequuntur repellat explicabo deserunt quam, doloribus praesentium vel id et error nostrum accusamus beatae? Voluptatem sint perspiciatis id praesentium, neque impedit sapiente molestiae placeat tempore saepe deleniti unde omnis illum nisi aperiam in velit, quidem vitae, excepturi consequatur. Dolorum amet possimus minima vero minus tenetur, impedit quos, facilis dolores eligendi illo perspiciatis dignissimos? Voluptatum quo consequatur non numquam, eum consequuntur ipsam, incidunt itaque eaque maiores aspernatur. Aperiam voluptas natus, optio sint odio hic aut nobis ea quas laborum repellat voluptatibus repellendus perferendis facere. Consequatur vitae incidunt esse optio ipsam eligendi animi eum, iure quod itaque qui perspiciatis dolorem necessitatibus. Porro quibusdam, excepturi illo culpa laudantium earum adipisci neque beatae ullam, accusamus atque dolores iste? Corporis repudiandae cum sint atque mollitia in eaque, nisi cumque necessitatibus cupiditate debitis fugit quo. Nisi nostrum, ut dignissimos minima ducimus, porro recusandae saepe doloremque deleniti temporibus maiores asperiores unde odit inventore doloribus magni quasi tempora nam! Praesentium debitis voluptate laboriosam exercitationem neque enim, a accusamus? At doloremque aspernatur voluptatum inventore autem magnam velit nulla eveniet? Sed possimus minima unde velit impedit! Similique minus obcaecati tempore labore, saepe accusamus numquam. Quam animi nihil in. Nesciunt, velit beatae reprehenderit id, mollitia eveniet officia iusto, provident voluptate doloribus sed labore optio autem ducimus tempora ab fugiat dolorem impedit similique tempore. Aut eum, vero sed voluptas possimus sit dolorem odit alias a, repudiandae ullam nostrum dolor fuga beatae laboriosam. Quidem praesentium a id illum sit consectetur nam cumque quis minus rem eveniet magnam voluptates vero pariatur temporibus deleniti, officiis ducimus ab obcaecati explicabo error natus odio. Ab, aspernatur. Nostrum maxime dignissimos unde? Animi expedita a quis qui quia facere tempore minus deleniti atque laboriosam similique, vitae neque vero voluptate quod doloribus eum laudantium facilis accusamus. Possimus, libero quae numquam illo non provident quia exercitationem excepturi distinctio, rem porro iure et aliquid. Suscipit exercitationem autem dolor accusantium inventore? Illo accusamus facilis quas repudiandae, repellendus quae excepturi quisquam impedit enim minus exercitationem qui. Amet corrupti cupiditate saepe adipisci incidunt? Fuga dolorum cum aspernatur, sit impedit quasi. Quidem similique, eligendi vitae voluptate nam alias cum ex odio? Voluptatem, aliquid dicta doloremque neque repudiandae non qui sed? Quaerat voluptatem asperiores vel quisquam expedita magni in sapiente, rem quae ullam voluptas consequatur harum nesciunt exercitationem veritatis maiores eos maxime dolor. Ea nisi error ex earum facere ducimus dolore facilis quo voluptate maxime sint totam minus beatae, incidunt exercitationem odio quas accusamus rerum nam ipsam laudantium molestiae! Illum cum ad harum! Explicabo nisi aspernatur, neque pariatur in ad tempora hic quis, dolorum quibusdam sapiente libero nemo. Dolores vero soluta itaque dolore atque assumenda, at velit repudiandae reprehenderit consequuntur, delectus sit consectetur dolor iste non et repellat quae dicta? Amet rerum numquam alias temporibus vero fugit eius sapiente, error illum exercitationem aliquam magni at soluta quisquam neque odio magnam voluptas! Enim id voluptates, hic explicabo quae saepe tempora alias nihil excepturi qui nemo, reiciendis voluptate laborum nisi amet odio! Hic, dolor cumque provident fugiat dolores ipsam, error modi delectus atque magni sequi unde animi, ducimus quos at. Aperiam, inventore ex id eveniet pariatur beatae tempore veritatis soluta obcaecati dignissimos quod maxime fugit nemo voluptatibus sit adipisci nostrum repellat rem laudantium ipsa magnam ab! Ratione corporis officia molestiae consectetur voluptatibus quidem perspiciatis ea aliquid recusandae, dicta expedita excepturi neque tempora, sunt iure corrupti architecto cumque, reiciendis vel. Pariatur fuga molestias minus ea porro. Iure saepe ipsam assumenda quasi cupiditate molestias mollitia. Quae corrupti repellat repudiandae! Soluta in earum nam excepturi vitae voluptas pariatur optio possimus dicta sit ullam provident, aspernatur dolores, laborum, explicabo illum aperiam animi sed error facere molestiae dolorem! Ullam laboriosam facere, tempora reprehenderit maiores velit. Reprehenderit nobis iure vero? Aperiam, vel fugit eaque quidem nobis facere. Fugit amet quidem placeat ducimus! Provident in, minus atque ullam unde beatae expedita! Odio consequatur magnam maxime velit illum illo earum animi facere cumque dicta reiciendis, neque id voluptatibus aut! Sed dolorem recusandae, voluptatibus eligendi nisi eos nam asperiores doloribus, error tenetur cupiditate molestias earum impedit quibusdam repellat nesciunt hic iure harum totam, mollitia deleniti distinctio neque. Vitae nisi, officia magnam, ut facilis iusto repudiandae, odit sunt pariatur saepe facere rem. Aut esse unde accusamus officia fuga eaque quas? Iste fuga animi, nemo dolorum perferendis veritatis earum exercitationem architecto minus quod aperiam vitae laudantium assumenda ex, saepe ipsum corporis minima. Rerum nam id ipsum fugiat cumque optio quo fugit aliquam eveniet reiciendis ullam quas facere temporibus ad, obcaecati laborum, saepe accusantium veritatis, ab nostrum natus laboriosam voluptates eius. Dolorem, beatae expedita tempora temporibus adipisci maiores totam corporis tempore! Assumenda id sint accusantium at, cum eius suscipit ipsam harum ab blanditiis sequi non aspernatur obcaecati placeat reiciendis amet voluptatum enim. Cupiditate, repudiandae! A reiciendis sint distinctio quia impedit ipsa. Perferendis esse veritatis tempore excepturi eum aspernatur non dolorum facilis at obcaecati exercitationem odit autem, nihil recusandae pariatur labore fuga reprehenderit quos cum doloremque. Quia earum aut, commodi nam maxime accusamus dolores velit repellat placeat vero veritatis nihil itaque sapiente ipsum minus blanditiis rerum voluptas quos adipisci harum? Nesciunt illo quam ea recusandae magni necessitatibus placeat labore porro, similique cum tenetur asperiores expedita eaque quia quasi vitae suscipit sit omnis qui. Veniam, quo atque ipsum esse nam impedit earum repudiandae consequatur in vero eveniet? Praesentium illo atque placeat est. Nostrum quo alias maxime, hic ad itaque sunt blanditiis quos laudantium asperiores? Tempora, doloremque ipsa itaque quae qui placeat hic quo consequuntur aut eum debitis explicabo totam veniam veritatis incidunt? Inventore sit repudiandae, consequuntur molestias ea dolor quis eum, rem architecto temporibus quasi odio dolores sapiente exercitationem perspiciatis illum quae nostrum? Blanditiis, velit facere, at, repellendus neque voluptatem nihil odio dolores rem dolorum numquam labore reiciendis ducimus delectus distinctio consequuntur quos inventore sit quo atque iusto? Nemo blanditiis atque magni cupiditate?
        </div>
    </div>
</template>
<style>
    .dashboard-grid{
        grid-template-areas: "a a a"
                             "b b b"
                             "c c c"
                             "e e e"
                             "d d d";
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
        grid-template-areas: "a a a"
                             "b c c"
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
    }
</style>