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

export const setToken =(token) => {
    return {
        type: 'SET_TOKEN',
        token: token
    }
}
