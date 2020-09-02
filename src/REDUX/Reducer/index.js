import {combineReducers} from 'redux'
import LoginFormReducer from './LoginFormReducer'
import UserReducer from './UserReducer'
import Confirm from './Confirmation'

export default combineReducers({
    loginForm: LoginFormReducer,
    user: UserReducer,
    confirmation: Confirm
})