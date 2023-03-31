import BitrixJS, {getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'


const tokensRes = await getAuth()

type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

const tokens  = tokensRes as Tokens

const bitrix = BitrixJS({
    client_id:'local.641862bc955802.61030664',
    client_secret: '4S7WyDcsNozU0zbhcu2et372cSzPeXz219JH6N3XkrVYHEpqYq',
    mode: ModeConfig.OAuth,
    domain: await getDomain(),
    https: true,
    ...tokens 
})

export default bitrix