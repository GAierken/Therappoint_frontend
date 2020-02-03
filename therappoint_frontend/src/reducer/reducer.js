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
    
        default:
           return state
    }
    
}

export default userReducer