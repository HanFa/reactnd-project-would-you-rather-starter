import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import Question from "./Question"


class Dashboard extends Component {

  onShowPollClicked = (e, qid) => {
    this.props.history.push(`/question/${ qid }`)
  }



  render() {
    const { answered, unanswered } = this.props
    return (
      <div>
        <h3 className='center'> Unanswered </h3>
        <div className='card-columns'>
          {
            unanswered.map((qid) =>
              <Question key={ qid } id={ qid } onShowPollClicked={ this.onShowPollClicked }/>
            )
          }
        </div>

        <hr/>
        <h3 className='center'> Answered </h3>
        <div className='card-columns'>
        {
          answered.map((qid) =>
            <Question key={ qid } id={ qid } onShowPollClicked={ this.onShowPollClicked }/>
          )
        }
        </div>


      </div>
    )
  }
}


const mapStateToProps = ({ questions, users, authedUser }) => {
  const answersByAuthedUser = users[authedUser].answers
  return {
    questions,
    users,
    answered: Object.entries(questions).filter(([key, values]) => {
      return Object.keys(answersByAuthedUser).includes(key)
    }).sort(([key_a, val_a], [key_b, val_b]) => (val_b.timestamp - val_a.timestamp) ).map((entry) => entry[0]),
    unanswered: Object.entries(questions).filter(([key, values]) => {
      return !Object.keys(answersByAuthedUser).includes(key)
    }).sort(([key_a, val_a], [key_b, val_b]) => (val_b.timestamp - val_a.timestamp) ).map((entry) => entry[0])
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))