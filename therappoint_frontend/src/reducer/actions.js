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
            localStorage.first_name = data.first_name
            localStorage.last_name = data.last_name
            localStorage.username = data.username
            localStorage.address = data.address
            localStorage.email = data.email
            localStorage.phone_number = data.phone_number
            localStorage.img_url = data.img_url
            localStorage.specialty = data.specialty
            localStorage.board_certified = data.board_certified
            
            if (localStorage.specialty === "null") {
                        localStorage.providers_appointments = JSON.stringify(data.provider_appointments)
                        localStorage.providers = JSON.stringify(data.providers)
            }else{
                        localStorage.client_appointments = JSON.stringify(data.client_appointments)
                        localStorage.clients = JSON.stringify(data.clients)
            }
        })
    }
}

export const LogOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export const updateSuccess = () => {
     return {
         type: 'UPDATE_SUCCESS',
         updated: true
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
                   dispatch(setUser(data))
                 
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
           localStorage.clear()
            Swal.fire({
                icon: 'success',
                title: 'Sad to see you go!',
                text: 'User is deleted!'
              })
        })
    }


}


export const setDate = (date) => {
    return {
        type: 'DATE',
        date: date
    }
}

export const setPickedUserId = (id) => {
    return {
        type: 'PICKED_USER',
        pickedId: id
    }
}

export const createAppointment = (date, userId01, userId02) => {
    return (dispatch) => {
        fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                client_id: userId01,
                provider_id: userId02,
                appoint_date: date
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
           
        })
    }
}



