import { createStore } from "vuex"

const store = createStore({
    state(){
        return {
            tokens:{
                access_token:'',
                refresh_token: '',
                expires_in: ''
            }
        }
    }
})
export default store