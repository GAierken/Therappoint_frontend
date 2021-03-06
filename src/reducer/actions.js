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
        fetch('https://peaceful-atoll-37638.herokuapp.com/users', {
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
                dispatch(authUser(localStorage.token, localStorage.id))
            }
            
        })
    }
}

export const loginUser = (user) => {
    return (dispatch) => {
        fetch("https://peaceful-atoll-37638.herokuapp.com/login", {
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
               dispatch(authUser(localStorage.token, localStorage.id))
                
               
           }

          
       })
    }
}


export const authUser = (token, id) => {
    
    return (dispatch) => {
        fetch(`https://peaceful-atoll-37638.herokuapp.com/users/${id}`,{
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

export const updateSuccess = () => {
     return {
         type: 'UPDATE_SUCCESS',
         updated: true
     }
}

export const changeUpdateState = () => {
    return {
        type: 'CHANGE_UPDATE_STATE',
        updated: false
    }
}


export const updateUser = (user) => {
  
    return (dispatch) => {
        fetch(`https://peaceful-atoll-37638.herokuapp.com/users/${user.id}`, {
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
        fetch(`https://peaceful-atoll-37638.herokuapp.com/users/${user.id}`,{
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(data => {
           localStorage.removeItem('token')
           localStorage.removeItem('id')
            Swal.fire({
                icon: 'success',
                title: 'Sad to see you go!',
                text: 'User is deleted!'
              })
              dispatch(setToken(null, null))
              dispatch(authUser(null, null))
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
        fetch('https://peaceful-atoll-37638.herokuapp.com/appointments', {
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
        .then(data=> {
            if(data.errors) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: data.errors
                  })
            }else{
            Swal.fire({
                icon: 'success',
                title: `Appointment for ${data.appoint_date} is scheduled!`
              })
              dispatch(authUser(localStorage.token, localStorage.id))}
        })
    }
}


export const deleteAppointment = (id) => {
    return (dispatch) => {
        fetch(`https://peaceful-atoll-37638.herokuapp.com/appointments/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                text: 'Appointment is canceled!'
              })
              dispatch(authUser(localStorage.token, localStorage.id))
        })
    }
}

export const updateAppointment = (id, date) => {
    return (dispatch) => {
        fetch(`https://peaceful-atoll-37638.herokuapp.com/appointments/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                appoint_date: date
            })
        })
        .then(r => r.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Schedule is updated!'
              })
              dispatch(authUser(localStorage.token, localStorage.id))
        })
    }
}


export const setSource = (source) => {
    return {
        type: 'SEARCH_SOURCE',
        source: source
    }
}


export const newSource = () => {
    return (dispatch) => {
        fetch('https://peaceful-atoll-37638.herokuapp.com/users')
        .then(r => r.json())
        .then(data => 
            dispatch(setSource(data)))
    }
}


export const setSearchedUser = (user) => {
    return {
        type: "SEARCHED_USER",
        searchedUser: user
    }
}

export const setSearchedValue = (value) => {
    return {
        type: 'SET_SEARCHED_VALUE',
        value: value
    }
}