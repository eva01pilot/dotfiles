import BitrixJS, {getAuth, getDomain, ModeConfig} from '@sknebo/bitrix-js'


const tokensRes = await getAuth()

type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

const tokens  = tokensRes as Tokens

const bitrix = BitrixJS({
    client_id:'local.6410755e6148e6.28333348',
    client_secret: 'GrPMJ3ii44KznRLnBSC00yYnnuMFdil5ICZ7hshFoJwTs0T2tP',
    mode: ModeConfig.OAuth,
    domain: await getDomain(),
    https: true,
    ...tokens 
})

export default bitrix