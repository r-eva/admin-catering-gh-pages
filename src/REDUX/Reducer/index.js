import {combineReducers} from 'redux'
import LoginFormReducer from './LoginFormReducer'
import UserReducer from './UserReducer'
import Confirm from './Confirmation'
import ManageProduct from './ManageProduct'

export default combineReducers({
    loginForm: LoginFormReducer,
    user: UserReducer,
    confirmation: Confirm,
    packageChecker: ManageProduct
})