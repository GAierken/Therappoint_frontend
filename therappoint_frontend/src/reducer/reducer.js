const initialState = {
    userClicked: false,
    userChoice: "",
    token: "",
    id: "",
    user: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLICK_BUTTON':
            return {
                ...state,
                userClicked: true
            }
        case 'USER_INPUT':
            return {
                ...state,
                userChoice: action.input
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                id: action.id,
                userChoice: ""
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
        
    
        default:
           return state
    }
    
}

export default userReducer