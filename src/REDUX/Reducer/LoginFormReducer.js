import {
    LOGIN_SUCCESS,
    ON_USER_LOGIN,
    LOGIN_FAILED
} from '../Action/types'

//INGET SETIAP GLOBAL STATE BERUBAH; COMPONENT AKAN RENDER ULANG
const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {   //pertama kali mulai langsung masuk ke default, karena action selalu ada isinya bawaan redux, (unknown isinya)
    switch(action.type) {
        case ON_USER_LOGIN:
            return {...state, loading: true, error: ''}
        case LOGIN_FAILED:
            return {...state, loading: false, error: action.payload}
        case LOGIN_SUCCESS:
            return INITIAL_STATE
        default: 
            return state
    }
}