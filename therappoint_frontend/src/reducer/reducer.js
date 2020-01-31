const initialState = {
    userClicked: false,
    userChoice: "",
    token: ""
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
                userChoice: ""
            }
            
        
    
        default:
           return state
    }
    
}

export default userReducer