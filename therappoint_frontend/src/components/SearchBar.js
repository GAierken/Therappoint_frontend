import React from 'react'
import { connect } from 'react-redux'
import {Search} from 'semantic-ui-react'
import { setSearchedUser, setSearchedValue} from '../reducer/actions'
import { Redirect } from 'react-router'


class SearchBar extends React.Component {

  state = {
      isLoading: false,
      results: [],
      resultSelect: false

  }



  handleSearchChange = (evt) => {
      
      let newVal = evt.target.value
     this.props.setSearchedValue(newVal)
     
     this.handleSource()
     
 
      
        
}


handleSource = () => {
    
    if(this.props.source){
        // different user would have different search result
        if(this.props.user.specialty){
            const newSource = this.props.source.map(object => {
                if (object.first_name && object.last_name) {
                    return { title: object.first_name.toLowerCase() + " " + object.last_name.toLowerCase() + " " + object.username.toLowerCase(), ...object}
                } else {
                    return { title: object.username.toLowerCase(), ...object}

                }
            }).filter((obj) => {
                return !obj.specialty
            }
            )
            
            const results = newSource.filter((obj) => {
                 return obj.title.indexOf(this.props.searchedValue) !== -1 
                
            })

            

            this.setState({
                ...this.state,
                results: results
            })}else{
                const newSource = this.props.source.map(object => {
                    if (object.first_name && object.last_name) {
                        return { title: object.first_name.toLowerCase() + " " + object.last_name.toLowerCase() + " " + object.username.toLowerCase(), ...object}
                    } else {
                        return { title: object.username.toLowerCase(), ...object}
    
                    }
                }).filter((obj) => {
                    return obj.specialty
                }
                )

                const results = newSource.filter((obj) => {
                     return obj.title.includes(this.props.searchedValue)
                    
                })
               
                this.setState({
                    ...this.state,
                    results: results
                })

            }
        }
    
}


  handleResultSelect = (evt) => {
       let searchedUser = [...this.state.results].find((user) => {
           return user.title === evt.target.innerText
       })

          this.props.setSearchedUser(searchedUser)
         
          localStorage.searched_id = searchedUser.id
          localStorage.searched_name = searchedUser.first_name + " " + searchedUser.last_name
          localStorage.searched_img = searchedUser.img_url
          localStorage.searched_address = searchedUser.address
          localStorage.searched_specialty = searchedUser.specialty
          localStorage.searched_board_certified = searchedUser.board_certified
          localStorage.searched_email = searchedUser.searched_email
          localStorage.searched_phone_number = searchedUser.searched_phone_number

      this.setState(
          {...this.state, resultSelect: !this.state.resultSelect}
      )
  }
  


render(){
     
  
     
    if(this.state.resultSelect === true) {
        return <Redirect to="/portfolio"></Redirect>
    }else{
      return (this.props.user.specialty?
        <Search onSearchChange={this.handleSearchChange} placeholder='Find your client by name' results={this.state.results} onResultSelect={this.handleResultSelect}/>
        :
        <Search onSearchChange={this.handleSearchChange} placeholder='Find your provider by name' results={this.state.results} onResultSelect={this.handleResultSelect}/>
       )

        


}

}
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        source: state.source,
        searchedValue: state.searchedValue
    }
}


export default connect(mapStateToProps, {setSearchedUser, setSearchedValue})(SearchBar)