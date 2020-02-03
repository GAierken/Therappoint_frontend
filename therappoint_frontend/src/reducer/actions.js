import Swal from 'sweetalert2'

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
        .then(data => {
            if (data.errors) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: data.errors
                  })
            } else {
                localStorage.token = data.token
                localStorage.id = data.user_id
               
                dispatch(setToken(data.token, data.user_id))
            }
            
        })
    }
}


export const authUser = (token, id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${id}`,{
            headers: {
                "Authorization": token
            }
        })
        .then(r => r.json())
        .then(data => {
            dispatch(setUser(data))
        })
    }
}
