import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'


import LoginWindow from "./LoginWindow"
import Dashboard from "./Dashboard"
import NewQuestion from "./NewQuestion"
import Nav from "./Nav"
import Poll from "./Poll"

import handleInitialData from "../actions/shared"

import '../App.css'
import { LoadingBar } from "react-redux-loading"
import { BrowserRouter, Route } from 'react-router-dom'
import Leaderboard from "./Leaderboard"

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {
    const { loading, authedUser } = this.props
    return (
      <div className='App'>
        <BrowserRouter>
          <LoadingBar/>
          <div className='Navbar'>
            <Nav/>
          </div>
          <hr/>
          <div className='Content'>
            {
              loading === true ? null :
              <Fragment>
                <Route path='/' exact component={ authedUser === "" ? LoginWindow : Dashboard }/>
                <Route path='/new' exact component={ NewQuestion }/>
                <Route path='/question/:id' exact component={ Poll } />
                <Route path='/leaderboard' exact component={ Leaderboard }/>
              </Fragment>
            }
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = ({ loading, authedUser }) => {
  return { loading, authedUser }
}

export default connect(mapStateToProps)(App)
