<script setup lang="ts">
import { ref, onBeforeMount, watch, markRaw, } from 'vue';
import { YandexMap } from 'vue-yandex-maps'
import bitrix from '../bitrix';
import { loadYmap } from 'vue-yandex-maps'
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU';
import generateColors from '../helpers/colorGenerator'
import moment from 'moment'
import dayjs from 'dayjs';
import splitArray from '../helpers/splitArray'
import { useBreakpoints } from '@vueuse/core'
import '../style.css'
import AdminScreen from './AdminScreen.vue';
import axios from 'axios'
import { useApiStore, useTokenStore } from '../store'
import getDistance from '../helpers/getDistance'
import 'dayjs/locale/ru';

dayjs.locale('ru')
interface IUser {
    avatar: string,
    checked: boolean,
    id: string,
    name: string,
    showInList: boolean,
    lineColor: string,
    path: {
        path: {
            [key: number]: {
                msg_id: string,
                coordinates: number[]
            },
        }
    }
}
const center = ref([55.7522, 37.6156])
const menuShown = ref(true);
const userQuery = ref<string>('')
const users = ref<IUser[] | null>(null)
const mapinstance = ref<ymaps.Map>()
const loading = ref(false)
const isAdmin = ref(false)
const apiStore = useApiStore()
const tokenStore = useTokenStore()
onBeforeMount(async () => {
    loading.value = true
    isAdmin.value = (await bitrix.users.admin()).result
    const userID = (await bitrix.app.profile() as any).result.ID
    const userDep = (await bitrix.users.get(userID)).result[0].UF_DEPARTMENT[0]
    tokenStore.setStructure(userDep)
    const usersOrigRes = await axios.get(apiStore.apiUrl, {
        params: {
            date: new Intl.DateTimeFormat('en-US').format(new Date()),
            member_id: tokenStore.memberID,
            access_token: bitrix.oauth.getCredentials().access_token,
            domain: 'https://tcrm.sknebo.ru'
        },
    })

    const usersOrig = usersOrigRes.data
    const userIDs = Object.keys(usersOrig)
    loading.value = false
    if (!userIDs.length) return
    const paths = Object.keys(usersOrig).map((u) => {
        let path = usersOrig[u as unknown as keyof typeof usersOrig]
        console.log(path);

        return {
            user: u,
            path: { ...path }
        }
    })
    const userArray = ((await bitrix.call('user.get' as any, { id: userIDs })) as unknown as any).result
    users.value = userArray.map((user: any, index: number) => ({
        avatar: user.PERSONAL_PHOTO,
        name: user.NAME + ' ' + user.LAST_NAME,
        checked: true,
        id: user.ID,
        showInList: true,
        lineColor: generateColors(index + 4),
        path: { ...paths.find(p => p.user == user.ID) }
    }))
    loading.value = false
})
await loadYmap({ // загружаем яндекс-карты чтобы получить доступ к ymaps-объекту
    apiKey: '', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1', // Версия Я.Карт
}
);
class Path extends ymaps.Polyline { } // наследование от абстрактных классов ymaps
class Mark extends ymaps.Placemark { } //
interface IRoute {
    path: Path[],
    placemarks: Mark[]
}
const pathsAndDots = markRaw<Map<string, IRoute>>(new Map());

const onMapCreated = (y: ymaps.Map) => {
    mapinstance.value = markRaw(y)
    mapinstance.value.options.set('autoFitToViewport', 'always')
}
const logListEnter = (event: Event, e: string) => {
    const target = (<HTMLDivElement>event.target)
    target.style.backgroundColor = '#ebebeb'
    pathsAndDots.forEach((val, key) => {
        if (key === e) return
        else {
            val.path.forEach((p) => {
                p.options.set('strokeOpacity', 0.1)
            })
        }
    })

}
const logListLeave = (event: Event, e: string) => {
    const target = (<HTMLDivElement>event.target)
    target.style.backgroundColor = 'white'
    pathsAndDots.forEach((val, key) => {
        if (key === e) return
        else {
            val.path.forEach((p) => {
                if (p.options.get('strokeStyle', {}) == 'dashdot' as Object) {
                    p.options.set('strokeOpacity', 0.4)
                } else {
                    p.options.set('strokeOpacity', 1)
                }

            }
            )
        }
    })
}
const onTimeChange = async (date: any, datestring: string) => {
    await bitrix.call('user.current')
    loading.value = true
    mapinstance.value.geoObjects.removeAll()
    pathsAndDots.clear()
    const data = await axios.get(apiStore.apiUrl, {
        params: {
            date: new Intl.DateTimeFormat('en-US').format(date),
            member_id: tokenStore.memberID,
            domain: window.location.origin,
            access_token: bitrix.oauth.getCredentials().access_token,
        }
    })
    const usersOrig = data.data
    if (!usersOrig) return
    const userIDs = Object.keys(usersOrig)
    const paths = Object.keys(usersOrig).map((u) => {
        const path = usersOrig[u as unknown as keyof typeof usersOrig]
        return {
            user: u,
            path: { ...path }
        }
    })
    if (!userIDs.length) {
        users.value = []
        return
    }
    const userArray = ((await bitrix.call('user.get' as any, { id: userIDs })) as unknown as any).result
    users.value = userArray.map((user: any, index: number) => ({
        avatar: user.PERSONAL_PHOTO,
        name: user.NAME + ' ' + user.LAST_NAME,
        checked: true,
        id: user.ID,
        showInList: true,
        lineColor: generateColors(index + 4),
        path: { ...paths.find(p => p.user == user.ID) }
    }))
    loading.value = false
}

const getIconDate = (date:string[])=>{
    const formatter = new Intl.DateTimeFormat('RU', { dateStyle: 'short', timeStyle: 'medium' })
    if(date.length===2){
        return `\n c ${formatter.format(+date[0]*1000)} по ${formatter.format(+date[1]*1000)}`
    }
    return `${formatter.format(+date[0]*1000)}`
}

watch(users, (newValue, oldValue) => {
    const formatter = new Intl.DateTimeFormat('RU', { dateStyle: 'short', timeStyle: 'medium' })
    if (!newValue) return
    if (!mapinstance.value) return
    newValue.forEach((user, index: number) => {
        if (user.checked) {
            if (pathsAndDots.get(user.id)) return
            if (!mapinstance.value) return
            if (!user.path.path) return
            const geometry = Object.values(user.path.path).map(el => el.coordinates)
            const geometryFiltered = [geometry[0]]
            let id = 0
            geometry.forEach((point, i)=>{
                if(i===0){
                    return
                }
                const [latbase, longbase] = geometryFiltered[id] 
                const [latcurr, longcurr] = point
                const distance = getDistance(latbase, longbase, latcurr, longcurr)
                if(distance>50){
                    geometryFiltered.push(point)
                    id++
                    console.log(id)
                } 
            })
            const geometryWithData = Object.keys(user.path.path).map(key => ({
                date: [key],
                geo: user.path.path[Number(key)].coordinates
            }))
            const geometryWithDataFiltered = [geometryWithData[0]]
            id = 0
            geometryWithData.forEach((point, i)=>{
                if(i===0){
                    return
                }
                const [latbase, longbase] = geometryWithDataFiltered[id].geo 
                const [latcurr, longcurr] = point.geo
                const distance = getDistance(latbase, longbase, latcurr, longcurr)
                if(distance>50){
                    geometryWithDataFiltered.push(point)
                    id++
                } else {
                    geometryWithDataFiltered[id].date[1] = point.date[0]
                }
                
            })
            console.log(geometryFiltered)
            const routeGeometryArray = splitArray(geometryFiltered) //tut
            const mainRouteArray = routeGeometryArray.map((geo) => new Path(geo, {
            }, { strokeColor: user.lineColor, strokeWidth: 8, zIndex: 100 }))
            const splitterRouteArray = routeGeometryArray.map((geo, i) => {
                if (i == 0) return
                const prevLastPoint = routeGeometryArray[i - 1][routeGeometryArray[i - 1].length - 1]
                const currLastPoint = routeGeometryArray[i][0]
                const lastPoints = [prevLastPoint, currLastPoint]
                const route = new Path(lastPoints, {},
                    { strokeColor: user.lineColor, strokeWidth: 8, zIndex: 100, strokeStyle: 'dashdot', strokeOpacity: 0.4 }
                )
                return route
            })
            const routeArray = [...mainRouteArray, ...splitterRouteArray].filter(el => el)
            routeArray.forEach((route) => {
                mapinstance.value.geoObjects.add(route)
            })

            const layout = ymaps.templateLayoutFactory.createClass(`
            <div class="user">
                <div class="user__img">
                    <img onerror="this.src='./avatar.jpg'" src="${user.avatar}" alt="имя">
                </div>
                <div class="user__wrapper">
                    <h4 class="user__name">{{ properties.iconContent }}</h4>
                    <p>{{ properties.iconContentDate }}</p>
                </div>
            </div>
            `)

            const placeMarkOptions: ymaps.IPlacemarkOptions = {
                iconLayout: layout,
                iconContentSize: [20, 20],
                iconImageSize: [20, 20],
                zIndex: 100,
                iconColor: user.lineColor
            }

            const placemarkArray = geometryWithDataFiltered.map((point, ind) => new Mark(point.geo, { //tut
                iconContent: `${user.name}`, iconContentIMG: user.avatar, iconContentDate: getIconDate(point.date)
            }, { iconColor: user.lineColor, zIndex: 0, preset: 'islands#blueCircleDotIcon' }))
            const markArray = placemarkArray.map((point)=>{
                const date = geometryWithDataFiltered.find(el => JSON.stringify(el.geo) === JSON.stringify(point.geometry?.getCoordinates()))?.date //tut
                return new Mark(point.geometry.getCoordinates() as number[], {
                        iconContent: `${user.name}`, iconContentDate: getIconDate(date)
                    }, { ...placeMarkOptions, zIndex: 100 })
                }) 
            placemarkArray.forEach((point, index) => {
                const enterType = window.innerWidth < 768 ? 'click' : 'mouseenter'
                point.events.add(enterType, () => {
                    if (!point.geometry) return
                    if (point.geometry.getCoordinates() === null) return
                    const date = geometryWithDataFiltered.find(el => JSON.stringify(el.geo) === JSON.stringify(point.geometry?.getCoordinates()))?.date //tut
                    markArray.forEach((mark)=>{
                        mapinstance.value?.geoObjects.remove(mark)
                    })
                    const mark = markArray[index]
                    mapinstance.value?.geoObjects.add(mark)
                    // const eventType = window.innerWidth<768 ? 'click' : 'mouseleave'
                    window.innerWidth >= 768 && point.events.add('mouseleave', () => mapinstance.value?.geoObjects.remove(mark))
                })
            })
            placemarkArray.forEach((mark: Mark) => {
                mapinstance.value?.geoObjects.add(mark)
            })
            pathsAndDots.set(user.id, {
                path: routeArray,
                placemarks: placemarkArray
            })
        } else {
            console.log(pathsAndDots.get(user.id))
            const path = pathsAndDots.get(user.id)?.path
            const placemarks = pathsAndDots.get(user.id)?.placemarks
            if (!path || !placemarks) return
            path.forEach((p) => {
                mapinstance.value.geoObjects.remove(p)
            })
            placemarks?.forEach((mark) => {
                mapinstance.value?.geoObjects.remove(mark)
            })
            pathsAndDots.delete(user.id)
        }
    })

}, {
    deep: true
})
const onInput = () => {
    users.value = users.value && users.value?.map((user) =>
        user.name.includes(userQuery.value) ? ({
            ...user,
            showInList: true
        })
            : ({
                ...user,
                showInList: false
            })
    )
}

const breakPoints = useBreakpoints({
    mobile: 768
})
const pageSize = ref(breakPoints.greater('mobile').value ? {
    pageSize: 10
} : {
    pageSize: 1
})
window.onresize = () => {
    pageSize.value = breakPoints.greater('mobile').value ? {
        pageSize: 10
    } : {
        pageSize: 1
    }
    menuShown.value = true
}
const logClick = (e: Event, uid) => {
    const target = <HTMLLIElement>e.target
    if (target.classList.contains('ant-list-item')) {
        mapinstance.value.panTo(pathsAndDots.get(uid).path[0].geometry.getBounds()[0])
        if(window.innerWidth< 768){
            menuShown.value = false
        }
        center.value = pathsAndDots.get(uid).path[0].geometry.getBounds()[0]
    }
}
const calculatePathLength = (id: string) => {
    if (!pathsAndDots.get(id)) return 'Скрыт'
    const paths = pathsAndDots.get(id).path
    let length = 0
    const KM_PER_DEG = 111.1
    paths.forEach((path) => {
        const coords = path.geometry.getCoordinates()
        for (let i = 1; i < coords.length; i++) {
            const prev = coords[i - 1]
            const curr = coords[i]
            const kmBetweenPoints = Math.sqrt(Math.pow(curr[0] - prev[0], 2) + Math.pow(curr[1] - prev[1], 2)) * KM_PER_DEG
            length += kmBetweenPoints
        }
    })
    return length.toFixed(2)
}
</script>

<template>
    <div class="wrapper">
        <a-drawer :visible="menuShown" closable placement="left" style="padding: 0%;" @close="menuShown = false">
            <a-tabs class="p-2">
                <a-tab-pane key="1" tab="Карта">
                    <div>
                        <div class="flex flex-row justify-between pb-2 items-center">
                            <a-date-picker :locale="locale" format="DD.MM.YYYY"
                                :defaultValue="dayjs(moment(new Date()).format('DD.MM.YYYY'), 'DD.MM.YYYY')"
                                :defaultPickerValue="dayjs(moment(new Date()).format('DD.MM.YYYY'), 'DD.MM.YYYY')"
                                @change="onTimeChange" />
                        </div>
                        <a-input placeholder="Введите имя сотрудника" v-model:value="userQuery" @input="onInput" />
                        <a-list :loading="loading" :locale="{
                            emptyText: 'Нет информации'
                        }" :data-source="users ?? []" size="medium" :pagination="pageSize" item-layout="horizontal">
                            <template #renderItem="{ item }">
                                <a-list-item @click="logClick($event, item.id)" @mouseleave="logListLeave($event, item.id)"
                                    @mouseenter="logListEnter($event, item.id)" v-if="item.showInList">
                                    <template #actions>
                                        <a-checkbox v-model:checked="item.checked" />
                                    </template>
                                    <a-list-item-meta class="pointer-events-none" @click="logClick($event, item.id)" :description="`Общая протяженность: ${calculatePathLength(item.id)}`">
                                        <template #title>
                                            {{ item.name }}
                                        </template>
                                        <template #avatar>
                                            <img @click="logClick($event, item.id)" width="48" height="48" class="rounded-full border"
                                                onerror="this.src='./avatar.jpg'" :src="item.avatar ?? './avatar.jpg'"
                                                size="large" />
                                        </template>
                                    </a-list-item-meta>
                                    <template #extra>
                                        <div @click="logClick($event, item.id)" :style="{ backgroundColor: item.lineColor, width: '5rem', height: '1rem' }">
                                        </div>
                                    </template>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>

                </a-tab-pane>
                <a-tab-pane key="2" tab="Настройки">
                    <AdminScreen />
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
        <a-affix :style="{ position: 'absolute', top: '50%', left: 0, zIndex: menuShown ? 50 : 10001 }">
            <a-button style="writing-mode:vertical-lr;text-orientation: upright;padding: 0.2rem;" @click="menuShown = true" class="h-24 text-center bg-white">
                    Меню
            </a-button>
        </a-affix>
        <YandexMap @created="onMapCreated" :coordinates="center" />
    </div>
</template>
<style>
.ant-notification-notice {
    background-color: rgb(50, 189, 50);
}

.ant-notification-notice-message {
    color: white;
}

.ant-tabs-nav-list {
    width: 100%;
}

.ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
}

.ant-drawer-body {
    padding: 0%;
}

.menu-enter-active,
.menu-leave-active,
.btn-enter-active,
.btn-leave-active {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(.48, .39, .32, .96);
}

.btn-enter-active {
    transition-delay: 300ms;
}

.menu-enter-from {
    height: 0;
}

.menu-enter-to {
    height: 100%;
}

.menu-leave-from {
    height: 100%;
}

.menu-leave-to {
    height: 0%;
}

.btn-enter-from {
    opacity: 0;
}

.btn-enter-to {
    opacity: 1;
}

.yandex-container {
    height: 100%;
    width: 100%;
    transition: height 300ms ease-out;
}


.pathmark {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}

.pathimg {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    position: relative;
}


.name {
    display: flex;
}

.wrapper {
    display: flex;
    flex-direction: column-reverse;
    width: 100vw;
    height: 100vh;
}

@media screen and (min-width: 768px) {
    .wrapper {
        flex-direction: row;
    }
}

body {
    overflow-x: hidden;
}

* {
    padding: 0px;
    margin: 0px;
    border: 0px;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

:focus,
:active {
    outline: none;
}

a:focus,
a:active {
    outline: none;
}



body {
    line-height: 1;
    font-family: Arial, Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
}

input,
button,
textarea {
    font-family: Arial, Helvetica, sans-serif;
    font-size: inherit;
}

button {
    cursor: pointer;
    color: inherit;
    background-color: inherit;
}

a {
    color: inherit;
}

a:link,
a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

ul li {
    list-style: none;
}

img {
    vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: inherit;
    font-size: inherit;
}

.user {
    position: absolute;
    top: 20%;
    left: 32%;
    width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0.75rem 1.25rem.75rem 1.25rem;
    border-radius: 2.5rem;
}

.user__wrapper {
    font-size: 14px;
    color: #dbdbdb;
    z-index: 5;
    margin-left: 10px;

}

.user::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(1px);
    border-radius: 2.5rem;
}


.user__img {
    z-index: 1;
    width: 110px !important;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user__img img {
    width: 55px !important;
    height: 55px !important;
    border-radius: 50%;
    object-fit: cover;
}

.user__name {
    font-weight: 600;
    margin-bottom: 4px;
    color: #fff;
}

.user__wrapper p {
    font-size: 12px;
    margin-bottom: 1px;
}

.user__time {
    font-size: 12px;
}
</style>
