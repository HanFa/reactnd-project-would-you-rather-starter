
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from "../actions/authedUser"

class LoginWindow extends Component {

  state = {
    selectedUserId: ''
  }

  onLogin = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.selectedUserId))
  }

  onChangeSelectedUser = (e) => {
    console.log("change to ", e.target.value)
    this.setState({ selectedUserId: e.target.value })
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <div className='center'>
          <h3> Welcome to the Would You Rather App!</h3>
          <p> Please Sign in to Continue. </p>
          <form onSubmit={ (e) => this.onLogin(e) }>

            <select onChange={ (e) => this.onChangeSelectedUser(e) }>
              <option disabled={ true } default> Please select your username. </option>
              { Object.entries(users).map(([id, values]) => ( <option key={ id }> { id }  </option> )) }
            </select>
            <div className='center'>
              <button>  Sign in  </button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return { users }
}

export default connect(mapStateToProps)(LoginWindow)