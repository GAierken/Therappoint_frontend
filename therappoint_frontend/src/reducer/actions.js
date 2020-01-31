export const showNextButtons = () => {
    return {
        type: 'CLICK_BUTTON'
    }
}

export const userInputPage = (userInput) => {
    return {
        type: 'USER_INPUT',
        input: userInput
    }
}

export const setToken = (token, id) => {
    return {
        type: 'SET_TOKEN',
        token: token,
        id: id
    }
}


export const setUser = (user) => {
    return {
        type: "SET_USER",
        user: user
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}
