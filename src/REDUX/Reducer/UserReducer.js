import { LOGIN_SUCCESS, USER_LOGOUT } from "../Action/types"

const INITIAL_STATE = {
    id: 0,
    username: '',
    email: '',
    status: '',
    role: '',
    token: '',
    encryptedEmail: '',
    userChecker: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...action.payload, userChecker: true}
        case USER_LOGOUT:
            return {...INITIAL_STATE, userChecker: true}
        case 'CHECK_LOCALSTORAGE':
            return {...state, userChecker: true}
        default:
            return state
    }
}