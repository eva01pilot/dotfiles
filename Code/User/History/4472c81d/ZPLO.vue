<script setup lang="ts">
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU';
import { computed, onMounted, ref } from 'vue';
import bitrix from '../../bitrix'
import type { Dayjs } from 'dayjs';
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Lead } from '@sknebo/bitrix-js';

type RangeValue = [Dayjs, Dayjs]
const dateRange = ref<RangeValue>()
const leadTotal = ref(0)
const contactTotal = ref(0)
const loading = ref(false)
const ready = ref({
    lead: {
        current: 0,
        total: 0
    },
    contact: {
        current: 0,
        total: 0
    }
})
interface IEntity {
    ID: string,
    QUERY: string,
    NAME: string,
    LAST_NAME: string,
    SECOND_NAME: string,
    UF_GENDER?: string,
    suggestion?: {
        NAME: string,
        LAST_NAME: string,
        SECOND_NAME: string,
    }
}

const checked = ref({
    lead: false,
    contact: false
})
const disabled = computed(() =>
    (!checked.value['contact'] && !checked.value['lead'])
)

const countValues = ref({
    lead:0,
    contact: 0
})
const props = defineProps<{
    api: 'dadata' | 'ahunter' | undefined
}>()
const generateQuery = (lead: IEntity) => {
    const noIvan = `${lead.LAST_NAME ?? ''} ${lead.NAME ?? ''} ${lead.SECOND_NAME ?? ''}`.replace(/\s+/g, ' ').trim()
    const yesIvan = `${lead.LAST_NAME ?? 'Блок'} ${lead.NAME ?? 'Женя'} ${lead.SECOND_NAME ?? 'Иванович'}`.replace(/\s+/g, ' ').trim()
    if (lead.NAME?.split(' ').length > 1) return noIvan
    if (lead.LAST_NAME?.split(' ').length > 1) return noIvan
    if (lead.SECOND_NAME?.split(' ').length > 1) return noIvan
    return noIvan
}
const startParsing = async () => {
    ready.value.contact = {
        current: 0,
        total: 0
    }
    ready.value.lead = {
        current: 0,
        total: 0
    }
    const entitiesTypes: any = Object.keys(checked.value).filter((key: any) => !!checked.value[key as 'lead' | 'contact'] && countValues.value[key as 'lead' | 'contact'] !== 0)
    const entities = new Map<'lead' | 'contact', any[]>([
        ['lead', []],
        ['contact', []]
    ])
    //entitiesTypes.forEach(async (entity: 'lead' | 'contact') => 
    loading.value = true
    for(const entity  of entitiesTypes){
        let nstart = 0
        let next
        while (nstart || nstart === 0) {
            const res = await bitrix.call(`crm.${entity}.list`, {
                filter: {
                    '>=DATE_CREATE': dateRange.value && dateRange.value[0].format(),
                    '<=DATE_CREATE': dateRange.value && dateRange.value[1].format()
                },
                select: ['UF_GENDER', 'NAME', 'LAST_NAME', 'SECOND_NAME', 'ID'],
                start: nstart,
            })
            nstart = res.next
            entities.get(entity as 'lead'|'contact')?.push(res.result)
            if(nstart>=countValues.value[entity as 'lead'|'contact']) {
                (entities.get(entity as 'lead' | 'contact') as any[]).length = countValues.value[entity as 'lead'|'contact']
                break
            }


        }
        entities.get(entity as 'lead'|'contact') && entities.set(entity as 'lead'|'contact', (entities.get(entity as 'lead'|'contact') ?? []).flat())
        if (!entities.get(entity as 'lead'|'contact')) break
        console.log((entities.get(entity as 'lead' | 'contact') as any[]))
        const leads: IEntity[] = (entities.get(entity as 'lead'|'contact') as any[]).flatMap((lead) => ({
            ID: lead.ID,
            QUERY: generateQuery(lead),             
            NAME: lead.NAME ?? '',
            LAST_NAME: lead.LAST_NAME ?? '',
            SECOND_NAME: lead.SECOND_NAME ?? '',
            UF_GENDER: lead.UF_GENDER ?? ''
        }))
        const ents: IEntity[] = []
        ready.value[entity as 'lead' | 'contact'].total = leads.length
        for (const [i, lead] of leads.entries()) {
            
            if (i > countValues.value[entity as 'lead'|'contact']) break
            if(!lead.NAME && !lead.LAST_NAME && !lead.SECOND_NAME) continue
            const ahunterURL = `https://ahunter.ru/site/suggest/person?output=json;query=${lead.QUERY};personlim=1s`
            const res = await fetch(ahunterURL)
            const suggestionsJSON = await res.json()
            if (!suggestionsJSON?.suggestions?.length) {
                continue
            }
            const suggestions = suggestionsJSON.suggestions[0]
            const { first_name: NAME, last_name: LAST_NAME, patronym: SECOND_NAME, value: RETURN_QUERY } = suggestions
            if (NAME === lead.NAME && LAST_NAME === lead.LAST_NAME && SECOND_NAME === lead.SECOND_NAME) {
                continue
            }
            if (RETURN_QUERY.trim() !== lead.QUERY.trim()) {
                continue
            }
            const suggestion = {
                NAME, LAST_NAME, SECOND_NAME, RETURN_QUERY
            }
            if((!NAME.length && !LAST_NAME.length && !SECOND_NAME.length)) continue
            else ents.push({
                ...lead,
                suggestion,
            })
        }
        const promises = ents.map((ent) => ({
            [ent.ID]: {
                method: `crm.${entity}.update`,
                params: {
                    ID: ent.ID,
                    fields: {
                        NAME: ent.suggestion?.NAME ?? '',
                        LAST_NAME: ent.suggestion?.LAST_NAME ?? '',
                        SECOND_NAME: ent.suggestion?.SECOND_NAME ?? ''  
                    }
                }
            }
        }))
        console.log(ents)
        const batch: any = {}
        for (let i = 0; i < promises.length; i++) {
            batch[Object.keys(promises[i])[0]] = Object.values(promises[i])[0];
        }
        await bitrix.batch(batch)
        ready.value[entity as 'lead'|'contact'].current = ready.value[entity as 'lead' | 'contact'].total

    }
    loading.value = false

}
onMounted(async () => {
    dayjs.locale('ru');

    const leadsRes = await bitrix.call('crm.lead.list')
    const contactRes = await bitrix.call('crm.contact.list')

    leadTotal.value = leadsRes.total
    contactTotal.value = contactRes.total
})

</script>

<template>
    <div  class="w-full h-[calc(100vh-10vh)] max-h-[calc(100vh-10vh)] overflow-y-scroll md:overflow-y-hidden flex justify-between items-center flex-col">
        <div class="h-5/6 flex items-center justify-between flex-col md:flex-row">
            <div class="flex justify-center items-center flex-col">
                <a-page-header title="Выберите промежуток времени"></a-page-header>
                <a-range-picker :locale="locale" v-model:value="dateRange" />
                <div class="w-[18.5rem]">
                    <div class="grid grid-cols-[1fr_1fr] gap-2 py-2">
                        <a-checkbox v-model:checked="checked['lead']">Лиды</a-checkbox>
                        <div>
                            <a-tooltip>
                                <template #title>Ограничение по обновляемым лидам</template>
                                Ограничение сверху:
                                <a-input-number :min="0" v-model:value="countValues['lead']" style="width: 100%;"
                                    :disabled="!checked['lead']">
                                    <template #addonBefore>
                                        <button @click="() => countValues = {
                                            ...countValues,
                                            lead: leadTotal
                                        }">без огр.</button>
                                    </template>
                                </a-input-number>
                            </a-tooltip>
                        </div>
                    </div>
                    <div class="grid grid-cols-[1fr_1fr] gap-2 py-2">
                        <a-checkbox v-model:checked="checked['contact']">Контакты</a-checkbox>
                        <div>
                            <a-tooltip>
                                <template #title>Ограничение по обновляемым контактам</template>
                                Ограничение сверху:
                                <a-input-number :min="0" v-model:value="countValues['contact']" style="width: 100%;"
                                    :disabled="!checked['contact']">
                                    <template #addonBefore>
                                        <button @click="() => countValues = {
                                            ...countValues,
                                            contact: contactTotal
                                        }">без огр.</button>
                                    </template>
                                </a-input-number>
                            </a-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <a-card v-if="ready['contact']">
                    <a-statistic  title="Исправлено контактов" :value="ready['contact'].current" :suffix="`/${ready['contact'].total}`">
                        <template #formatter="{value}">
                            {{ value }}
                        </template>
                    </a-statistic>
                </a-card>
                <a-card v-if="ready['lead']">
                    <a-statistic  title="Исправлено лидов" :value="ready['lead'].current" :suffix="`/${ready['lead'].total}`" >
                        <template #formatter="{value}">
                            {{ value }}
                        </template>
                    </a-statistic>
                </a-card>
            </div>
        </div>
        <a-button :loading="loading" :disabled="disabled" @click="startParsing"
            class="my-2">Запустить валидацию</a-button>
        <div class="grid grid-cols-[2fr_12fr]  border p-4 bg-red-100">
            <exclamation-circle-filled style="color: rgb(255 0 0); font-size: 4rem; padding: 16px;" />
            <div class="flex items-center justify-center">
                <ul class="p-2 m-0">
                    <li class="font-bold">Используйте валидацию на свой страх и риск!</li>
                    <li>Приложение пройдется по контактам и лидам за указанный промежуток времени и с помощью API ahunter
                    </li>
                    <li>проведет валидацию и обновит поля <b>NAME, LAST_NAME, SECOND_NAME</b></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
.ant-tabs-nav {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center;
}

.ant-tabs-nav-wrap {
    align-self: center !important;
}</style>