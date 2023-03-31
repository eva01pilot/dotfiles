<script setup lang="ts">
import { notification } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { onMounted, ref } from 'vue';
import bitrix from '../bitrix';
import { useTokenStore } from '../store';

const store = useTokenStore()
const filter = ref('')
interface IUSer {
    ID: string,
    AVATAR: string,
    DEPARTMENT: number[],
    FULLNAME: string
}
const users = ref<IUSer[]>()
const usersCached = ref<IUSer[]>()
const loading = ref(false)
const filterUsers = () => {
    users.value = usersCached.value.filter((user) => user.FULLNAME.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()))
}
const calcPagination = () => {
    console.log(((window.innerHeight - 105 - 32) / 73).toFixed());

    return ({
        size: 'small',
        pageSize: +(((window.innerHeight - 105 - 80) / 80).toFixed()) - 1
    })
}
const saveClipboard = async (ID: string) => {
    const text = `t.me/catsimages_bot?start=${store.memberID}_${ID}`
    navigator.clipboard.writeText(text).then(() => {
        notification.open({
            message: `Ссылка на приглашение пользователя в бот сохранена в буфер обмена`,
        });
    })
}
onMounted(async () => {
    let start = 0
    loading.value = true
    const usersResult = []
    while(start || start===0){
        const res = (await bitrix.call('user.search', {
            start:start
        }))
        usersResult.push(res.result)        
        start = res.next
    }
    const usersFlat = usersResult.flat()
    users.value = Object.values(usersFlat).map(({ ID, NAME, LAST_NAME, UF_DEPARTMENT, PERSONAL_PHOTO }) => ({
        ID: ID,
        AVATAR: PERSONAL_PHOTO,
        DEPARTMENT: UF_DEPARTMENT,
        FULLNAME: `${NAME ?? ''} ${LAST_NAME ?? ''}`.replace(/\s+/g, ' ').trim()
    }))
    console.log(store.memberID)
    usersCached.value = cloneDeep(users.value)
    loading.value = false
})
</script>
<template>
    <a-list :loading="loading" :data-source="users" item-layout="horizontal" :pagination="calcPagination()">
        <template #header>
            <div class="p-2">
                <h2 class="text-2xl p-2">Пользователи</h2>
                <a-input placeholder="Введите имя сотрудника" v-model:value="filter" @input="filterUsers" />
            </div>
        </template>
        <template #renderItem="{ item }: { item: IUSer }">
            <a-list-item class="p-2">
                <template #actions>
                    <a-button @click="() => saveClipboard(item.ID)">
                        Пригласить
                    </a-button>
                </template>
                <a-list-item-meta>
                    <template #title>
                        {{ item.FULLNAME }}
                    </template>
                    <template #avatar>
                        <img width="48" height="48" class="rounded-full border" :src="item.AVATAR ?? './avatar.jpg'"
                            onerror="this.src = './avatar.jpg'" />
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>
<style>
.ant-pagination {
    padding: 0.5rem;
}
</style>
<!-- {
    "settingsObj":{
        "isAllowed": true
    },
    "member_id": "c030f30bc80f2f746c8c466fee488362",
    "tg_id": "10",
    "crm_id": "389"
} -->
<!-- {
    "lat": "70",
    "long": "70",
    "time": "1680077600",
    "horizontal_accuracy": "10.5",
    "message_id": "530",
    "tg_id": "2"
} -->


