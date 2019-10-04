import React, { Component } from 'react'
import { connect } from 'react-redux'

import { unsetAuthedUser } from "../actions/authedUser"

class Nav extends Component {

  onLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(unsetAuthedUser())
  }

  render() {
    const { authedUser } = this.props
    return (
      <div>
        <nav className='nav'>
          <ul>
            <li>
              <strong> Home </strong>
            </li>
            <li>
              New Questions
            </li>
            <li>
              Leader Board
            </li>
            { authedUser === '' ? null : <li onClick={ (e) => { this.onLogout(e) } }> Log out </li> }
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { authedUser }
}

export default connect(mapStateToProps)(Nav)