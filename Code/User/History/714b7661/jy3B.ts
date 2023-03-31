import BitrixJS, {authWithRouter, getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'
import router from './router';
const config = {
    client_id:'local.63f897bf703365.01579850',
    client_secret:'6Y74xJ9igWQfu96uPhJr3O3zX9J5622HavDnw19yTUyn2skW9W',
};
let bitrix = BitrixJS({
  user_id:'733',
  access_token: '752k7g6mc15e2mty',
  //...config,
  domain: 'tcrm.sknebo.ru',
  mode: ModeConfig.Webhook,
  https: true
})
if (!window.name) {
    router.beforeEach(async (to, from, next)=>{
        const res = await bitrix.call('client.data.auth.get');
        if(res.result.logged===false){
            next({path:'/login'})
        }
        next()
    })
} else {
    /**
     * если мы во фрейме - берем те токены, которые нам передаются
     */
    (async () => {
        type token = {
            refresh_token: string,
            expires_in: number,
            access_token: string
        }
        const tokens:token = await getAuth() as token;
        if(!tokens) return
        
        bitrix = BitrixJS({
            mode: ModeConfig.OAuth,
            ...config,
            https: true,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            access_token: tokens.access_token,
            domain: await getDomain(),
        });
    })();
}
export default bitrix