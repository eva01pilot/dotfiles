import BitrixJS, { authWithRouter, getAuth, getDomain, ModeConfig } from '@sknebo/bitrix-js'
import router from './router';
import store from './store';
const config = {
    client_id: 'local.63f897bf703365.01579850',
    client_secret: '6Y74xJ9igWQfu96uPhJr3O3zX9J5622HavDnw19yTUyn2skW9W',
};
let bitrix = BitrixJS({
    user_id: '733',
    access_token: '752k7g6mc15e2mty',
    //...config,
    domain: 'tcrm.sknebo.ru',
    mode: ModeConfig.Webhook,
    https: true
})

console.log(store.state.tokens)
if (store.state.tokens.access_token){
    bitrix = BitrixJS({
        ...store.state.tokens,
        mode: ModeConfig.OAuth,
        domain: 'tcrm.sknebo.ru',
        https:true,
        ...config
    })
}


router.beforeEach((to, from, next) => {
    bitrix.call('client.data.auth.get').then((res: any) => {
        console.log(res)
        if (res.result.logged === false) {
            router.push({ name: 'login' })
        }
        else {
            store.state.tokens = res.result
            next({ name: 'Main' })
        }
    });
    next()
})
export default bitrix