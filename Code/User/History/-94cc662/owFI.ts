import BitrixJS, {getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'


const tokensRes = await getAuth()

type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

const tokens  = tokensRes as Tokens

const bitrix = BitrixJS({
    client_id:'local.640dbaadec2b67.45669888',
    client_secret: 'hnS88Ijxe60AsBfwxqKPTVaM3gpM8t7ERx35KeDKpltP6HCjsJ',
    mode: ModeConfig.OAuth,
    domain: await getDomain(),
    https: true,
    ...tokens 
})

export default bitrix