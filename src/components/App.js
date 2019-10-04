import React, { Component } from 'react'
import { connect } from 'react-redux'


import LoginWindow from "./LoginWindow"
import Dashboard from "./Dashboard"
import Nav from "./Nav"


import handleInitialData from "../actions/shared"

import '../App.css'
import { LoadingBar } from "react-redux-loading"
import authedUser from "../reducers/authedUser"

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {

    const { loading, authedUser } = this.props
    return (
      <div className='App'>
        <LoadingBar/>
        <div className='Navbar'>
          <Nav/>
        </div>
        <hr/>
        <div className='Content'>
          { loading === true ? null :
            authedUser === "" ? <LoginWindow/> : <Dashboard/> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loading, authedUser }) => {
  return { loading, authedUser }
}

export default connect(mapStateToProps)(App)
