const initialState = {
    token: "",
    id: "",
    user: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                id: action.id,
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user

            }
        case 'LOG_OUT':
            return {
                ...initialState
            }
        case 'SET_CATEGORY':
           
            return {
             ...state,
             category: action.category
            }
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                updated: action.updated
            }
        default:
           return state
    }
    
}

export default userReducer