import BitrixJS, {
    authWithRouter,
    ModeConfig,
    OAuthEvents,
} from "@sknebo/bitrix-js";
import router from './router'
import { getAuth, getDomain } from "@sknebo/bitrix-js";
const config = {

    client_id: 'app.6426c0628fcaf4.18275619', 
    client_secret: 'i107bI55vQvTkON2vfGLiuMk9OgiEQDV4KABWiW8rtkxEyui5j',

};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const domain = urlParams.get('domain') || window.location.host
let bitrix = BitrixJS({
    mode: ModeConfig.OAuth,
    ...config,
    domain,
    https: true,
});

console.debug('Bitrix', bitrix)
interface auth {
    refresh_token: string,
    expires_in: any,
    access_token: string,
    member_id:string
}
if (!window.name) {
    authWithRouter(router, bitrix)
} else {
    const tokens = await getAuth() as unknown as auth
    bitrix = BitrixJS({
        mode: ModeConfig.OAuth,
        ...config,
        https: true,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        access_token: tokens.access_token,
        domain: await getDomain()
    })
}


export default bitrix;
