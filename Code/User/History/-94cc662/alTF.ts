import BitrixJS, {getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'


const tokensRes = await getAuth()

type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

const tokens  = tokensRes as Tokens

const bitrix = BitrixJS({
    client_id:'local.64186ae5105b20.17217715',
    client_secret: 'onbhai6wg2fx5VEKoaihOImaQdyHnTIJq51rtBYTS8279pyDXt',
    mode: ModeConfig.OAuth,
    domain: await getDomain(),
    https: true,
    ...tokens 
})

export default bitrix