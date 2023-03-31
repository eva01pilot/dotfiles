import BitrixJS, {
    authWithRouter,
    ModeConfig,
    OAuthEvents,
} from "@sknebo/bitrix-js";
import router from './router'
import { getAuth, getDomain } from "@sknebo/bitrix-js";
const config = {
    //client_id: 'local.641c4d8b56f710.66183788',
    //client_secret: 'Tv2QpBoyNPja9i9ux5jKYyq0aNjuInqYd4I3xRvQJ0Y12gFHSj'
    client_id: 'local.64240d6a05a5c9.56802192',
    client_secret: '7u1YQ1LLqT9PzxkaGlT18YAssX7rhm7RP9XAbdk2AFb0jE7SWD',
};

let bitrix = BitrixJS({
    mode: ModeConfig.OAuth,
    ...config,
    domain: window.location.host,
    https: true,
});

console.debug('Bitrix', bitrix)
interface auth {
    refresh_token: string,
    expires_in: any,
    access_token: string
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
