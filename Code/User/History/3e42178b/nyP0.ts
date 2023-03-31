import BitrixJS, { ModeConfig } from '@sknebo/bitrix-js'
import router from './router';
import store from './store';
const config = {
    client_id: 'local.63f897bf703365.01579850',
    client_secret: '6Y74xJ9igWQfu96uPhJr3O3zX9J5622HavDnw19yTUyn2skW9W',
};
let bitrixLogin = BitrixJS({
    ...config,
    ...store.state.tokens,
    domain: 'tcrm.sknebo.ru',
    mode: ModeConfig.OAuth,
    https: true
})

router.beforeEach((to, from, next) => {
    bitrixLogin.call('client.data.auth.get').then((res: any) => {
            console.log(res)
            if (res.result.logged === false) {
                router.push({ name: 'login' })
            }
            else {
                store.state.tokens = res.result
                console.log(store.state.tokens)
                router.push({ name: 'Main' })
            }
    });
    next()
})
export default bitrixLogin