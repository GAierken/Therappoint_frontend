
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

export const createUser = (user) => {
    
    return (dispatch) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'accept': "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(r => r.json())
        .then(newUser => {
            dispatch(setToken(newUser.token, newUser.user_id))
        })
    }
}

