import BitrixJS, {getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'


const tokensRes = await getAuth()

type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

const tokens  = tokensRes as Tokens

const bitrix = BitrixJS({
    client_id:'local.6418989636f629.11570986',
    client_secret: 'KX723omP04ySLXnY0y5eKn4qmfq5dIViaMzJWWgU1FwCbNW04q',
    mode: ModeConfig.OAuth,
    domain: await getDomain(),
    https: true,
    ...tokens 
})

export default bitrix