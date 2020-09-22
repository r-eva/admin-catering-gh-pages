const INITIAL_STATE = {
    updatePackage: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_PACKAGE':
            return {...INITIAL_STATE, updatePackage: true}
        case 'UPDATE_DONE':
            return {...state, updatePackage: false}
        default:
            return state
    }
}