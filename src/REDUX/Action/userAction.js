import {LOGIN_SUCCESS, USER_LOGOUT} from './types'
import Axios from 'axios'
import { urlApi } from '../../HELPERS/database'

export const confirmLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const keepLogin = (tokennya) => {
    return (dispatch) => {
        var options = {
            headers: {
                'Authorization': `Bearer ${tokennya}`
            }
        }
        Axios.post(urlApi + 'user/keeplogin', null, options)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            localStorage.removeItem('token')
            dispatch({
                type: USER_LOGOUT,
            })
            console.log(err)
        })
    }
}

export const userLogout = () => {
    localStorage.removeItem('token')
    return {
        type: USER_LOGOUT
    }
}

export const checkLocalStorage = () => {
    return (dispatch) => {
        dispatch({
            type: 'CHECK_LOCALSTORAGE'
        })
    }
}

export const hitungConfirmation = () => {
    return (dispatch) => {
        Axios.get(urlApi + `admin/getTransaksiMenunggu`)
        .then((res) => {
            dispatch({
                type: 'HITUNG_CONFIRMATION',
                jumlahConfirm: res.data.length
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}