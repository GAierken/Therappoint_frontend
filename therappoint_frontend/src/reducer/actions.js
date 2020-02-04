import Swal from 'sweetalert2'

export const setCategory = (category) => {
    return {
        type: "SET_CATEGORY",
        category: category
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
                dispatch(authUser(data.token, data.user_id))
            }
            
        })
    }
}

export const loginUser = (user) => {
    return (dispatch) => {
        fetch("http://localhost:3000/login", {
           method: 'POST',
           headers: {
               "content-type": "application/json",
               "accept": "application/json"
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
               localStorage.id = data.id
               
               dispatch(setToken(data.token, data.id))
               dispatch(authUser(data.token, data.id))
                
               
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

export const LogOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:  JSON.stringify(user)
        })
        .then(r => r.json())
        .then(data => 
            {
                if (data.errors) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: data.errors
                      })
                } else {
                    localStorage.token = data.token
                    localStorage.id = data.user_id
                   
                    dispatch(setUser(user))
                }
                
            }
            
        )
    }
}


export const deleteUser = (user) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${user.id}`,{
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Sad to see you go!',
                text: 'User is deleted!'
              })
        })
    }
}
