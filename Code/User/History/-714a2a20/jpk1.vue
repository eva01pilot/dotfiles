<script setup lang="ts">
import { onMounted, ref } from 'vue';
import bitrix from '../bitrix';
import { InfoCircleFilled } from '@ant-design/icons-vue'
import Parse from './tabs/Parse.vue'
type Checked = {
    [key: string]: boolean
}
const checked = ref<Checked>({
    ahunter: true,
    dadata: false
})

const values = ref({
    ahunter: '',
    dadata: '',
    dadataSecret:''
})
const notSaved = ref(false)
const checkBalance = (money: number) => {
    return money > 10 ? 'green' : 'red'
}
const isAdmin = ref(false)
const ahunterBalance = ref<number>()
//const dadataBalance = ref<number>()

const cachedValues = ref({
    ahunter: '',
    dadata: '',
    dadataSecret: ''
})
type API = 'dadata' | 'ahunter' | 'dadataSecret'

const changeApiKeys = (api: API, event: any) => {
    if (cachedValues.value.ahunter === values.value.ahunter && cachedValues.value.dadata === values.value.dadata) {
        notSaved.value = false
    }
    else notSaved.value = true

    const value = event.target.value
    values.value[api] = value
}
const switchApi = async (api: API, event: boolean) => {
    switch (api) {
        case 'ahunter': {
            checked.value['ahunter'] = event
            checked.value['dadata'] = !event
            break
        }
        case 'dadata': {
            console.log(event, api)
            checked.value['dadata'] = event
            checked.value['ahunter'] = !event
            break
        }
    }
    await bitrix.app.option.set({
        'usedApi': Object.keys(checked.value).filter((key) => checked.value[key])[0],
    })
}
const saveSettings = async () => {
    if (!values.value['ahunter'] && !values.value['dadata']) return
    notSaved.value = false
    console.log(values.value['ahunter']);
    await bitrix.app.option.set({
        'ahunterApiKey': values.value['ahunter'],
        'dadataApiKey': values.value['dadata'],
        'dadataSecretKey': values.value['dadataSecret']
    })
}
const addFields = async () => {
    await bitrix.call('userfieldtype.add', {
        USER_TYPE_ID: 'nebo_fio',
        HANDLER: location.origin + location.pathname,
        TITLE: 'Поле ФИО',
        DESCRIPTION: 'Поле с подсказками по ФИО'
    })
    await bitrix.call('crm.lead.userfield.add', {
        fields: {
            "FIELD_NAME": "NEBO_FIO",
            "EDIT_FORM_LABEL": "Поле ФИО",
            "LIST_COLUMN_LABEL": "Поле ФИО",
            "USER_TYPE_ID": "nebo_fio",
            "XML_ID": "NEBO_FIO",
        }
    })
    await bitrix.call('crm.contact.userfield.add', {
        fields: {
            "FIELD_NAME": "NEBO_FIO",
            "EDIT_FORM_LABEL": "Поле ФИО",
            "LIST_COLUMN_LABEL": "Поле ФИО",
            "USER_TYPE_ID": "nebo_fio",
            "XML_ID": "NEBO_FIO",
        }
    })
    await bitrix.app.option.set({
        'usedApi': 'ahunter'
    })
    await bitrix.call("crm.lead.userfield.add", {
        fields: {
            FIELD_NAME: "NEBO_GENDER",
            EDIT_FORM_LABEL: "Выберите гендер",
            LIST_COLUMN_LABEL: "Выберите гендер",
            USER_TYPE_ID: "enumeration",
            XML_ID: "NEBO_GENDER",
            LIST: [
                { VALUE: "Мужчина", XML_ID: "MALE" },
                { VALUE: "Женщина", XML_ID: "FEMALE" },
                { VALUE: "Иное", XML_ID: "OTHER" },
            ],
            SETTINGS: { DEFAULT_VALUE: "Мужчина" },
        },
    });
    await bitrix.call("crm.contact.userfield.add", {
        fields: {
            FIELD_NAME: "NEBO_GENDER",
            EDIT_FORM_LABEL: "Выберите гендер",
            LIST_COLUMN_LABEL: "Выберите гендер",
            USER_TYPE_ID: "enumeration",
            XML_ID: "NEBO_GENDER",
            LIST: [
                { VALUE: "Мужчина", XML_ID: "MALE" },
                { VALUE: "Женщина", XML_ID: "FEMALE" },
                { VALUE: "Иное", XML_ID: "OTHER" },
            ],
            SETTINGS: { DEFAULT_VALUE: "Мужчина" },
        },
    });
    const fields = await bitrix.call("crm.lead.userfield.list", {
        order: { SORT: "ASC" },
        filter: {
            XML_ID: ["NEBO_FIO", "NEBO_GENDER",
            ]
        },
    })
    if (!fields.result) console.error("nope");
    else {
        let options = fields.result.filter((el: any) => el.XML_ID === "NEBO_GENDER")[0]
            .LIST;
        await bitrix.app.option.set({
            "genderFieldsLead": options
        });
        await bitrix.app.option.get('genderFieldsLead')
    }
    const fieldsContact = await bitrix.call("crm.contact.userfield.list", {
        order: { SORT: "ASC" },
        filter: {
            XML_ID: ["NEBO_FIO", "NEBO_GENDER",
            ]
        },
    })
    if (!fieldsContact.result) console.error("nope");
    else {
        let options = fieldsContact.result.filter((el: any) => el.XML_ID === "NEBO_GENDER")[0]
            .LIST;
        await bitrix.app.option.set({
            "genderFieldsContact": options
        });
        await bitrix.app.option.get('genderFieldsContact')
    }
}
onMounted(async () => {
    const isAdminRes = await bitrix.app.profile() as any
    isAdmin.value = isAdminRes.result.ADMIN
    
    const usedApiRes = await bitrix.app.option.get('usedApi')
    const usedApi = usedApiRes.result
    if (usedApi === 'ahunter') {
        checked.value['ahunter'] = true
        checked.value['dadata'] = false
    } else {
        checked.value['ahunter'] = false
        checked.value['dadata'] = true
    }
    const ahunterApiKeyRes = await bitrix.app.option.get('ahunterApiKey')
    values.value.ahunter = ahunterApiKeyRes.result
    const dadataApiKeyRes = await bitrix.app.option.get('dadataApiKey')
    values.value.dadata = dadataApiKeyRes.result
    const dadataSecretKeyRes = await bitrix.app.option.get('dadataSecretKey')
    values.value.dadataSecret = dadataSecretKeyRes.result
    
    const accountURL = 'https://ahunter.ru/site/user/account/get?user=' + values.value['ahunter'] + ';output=json|pretty';
    if (values.value['ahunter']) {
        const accRes = await fetch(accountURL)
        const accInfo = await accRes.json()
        ahunterBalance.value = accInfo.actual_sum / 100
    }
    cachedValues.value = { ...values.value }
    const isUserField = await bitrix.call('userfieldtype.list', {
        USER_TYPE_ID: "nebo_fio"
    })
    if (!isUserField.result.length) {
        await addFields()
    }
})
</script>
<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <a-tabs v-if="isAdmin">
            <a-tab-pane key="1" tab="Валидация ФИО">
                <Parse />
            </a-tab-pane>
            <a-tab-pane forceRender key="2" tab="Настройки приложения">
                <div class="flex items-center flex-col w-screen h-[calc(100svh-10rem)] max-h-[35rem] justify-between">
                    <a-page-header title="Выберите сервис подсказок"></a-page-header>
                    <div class="flex md:flex-row flex-col items-center">
                        <a-input placeholder="Введите ключ API ahunter" v-model:value="values['ahunter']"
                            @change="changeApiKeys('ahunter', $event)">
                            <template #addonBefore>
                                <h1 class="w-20 m-0">ahunter</h1>
                            </template>
                            <template #addonAfter>
                                <a-switch @change="switchApi('ahunter', $event)" v-model:checked="checked['ahunter']" />
                            </template>
                            <template #suffix>
                                <p class="m-0">
                                    <span :class="`text-${checkBalance(ahunterBalance ?? 0)??'text-green-500'}-500`">
                                        {{ ahunterBalance }} р.
                                    </span>
                                </p>
                            </template>
                        </a-input>
                        <span class="p-2 divider">
                            ИЛИ
                        </span>
                        <div class="flex flex-col w-full">
                            <div class="py-2">
                                <a-input placeholder="Введите ключ API dadata" v-model:value="values['dadata']"
                                    @change="changeApiKeys('dadata', $event)">
                                    <template #addonBefore>
                                        <h1 class="w-20 m-0">dadata</h1>
                                    </template>
                                    <template #addonAfter>
                                        <a-switch @change="switchApi('dadata', $event)" v-model:checked="checked['dadata']" />
                                    </template>
                                </a-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center text-red-600">
                        <p v-if="notSaved" class="m-0 p-2">
                            Не забудьте сохранить настройки
                        </p>
                        <a-button type="primary" @click="saveSettings">Сохранить настройки</a-button>
                    </div>
                    <div class="grid grid-cols-[2fr_12fr]  border p-4">
                        <info-circle-filled style="color: rgb(125 211 252); font-size: 4rem;" />
                        <div class="flex items-center justify-center">
                            <ul class="p-2 m-0">
                                <li>При использовании API dadata ключ обязателен для работы приложения</li>
                                <li>Если вы используете API ahunter, то ключ нужен для заполнения поля Выберите Гендер</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
        <h1 v-else>Вы не можете редактировать настройки приложения, поскольку вы не являетесь админомы</h1>
    </div>
</template>
<style scoped>
.divider {
    position: relative;
}

.divider::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 100%;
    border: 0px;
    height: 25px;
}
.divider::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    border: 0px;
    height: 25px;
}
@media screen and  (min-width:768px) {
    .divider::before, .divider::after{
        border-right: 1px solid rgb(187, 187, 187);
    }
}
</style>