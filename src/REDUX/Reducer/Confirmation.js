const INITIAL_STATE = {jumlahConfirm: 0}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'HITUNG_CONFIRMATION':
            return {...state, jumlahConfirm: action.jumlahConfirm}
        default:
            return state
    }
}