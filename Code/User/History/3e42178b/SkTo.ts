import BitrixJS, { ModeConfig } from '@sknebo/bitrix-js'
import store from './store';
const config = {
    client_id: 'local.63f897bf703365.01579850',
    client_secret: '6Y74xJ9igWQfu96uPhJr3O3zX9J5622HavDnw19yTUyn2skW9W',
};
console.log(store.state.tokens)
let bitrix = BitrixJS({
    ...config,
    ...store.state.tokens,
    domain: 'tcrm.sknebo.ru',
    mode: ModeConfig.OAuth,
    https: true
})
const bitrixGetter = () => {
    let bx = BitrixJS({
        ...config,
        ...store.state.tokens,
        domain: 'tcrm.sknebo.ru',
        mode: ModeConfig.OAuth,
        https: true
    })
    return bx
}

export default bitrixGetter