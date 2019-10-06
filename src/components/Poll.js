import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { handleVoteQuestion } from '../actions/questions'
import { CanvasJSChart } from '../canvasjs.react'

class Poll extends Component {

  state = {
    selected: ""
  }

  componentDidMount() {
    const { authedUser, history } = this.props
    if (authedUser === '') {
      alert("Please log in first to checkout this poll!")
      history.push('/')
    }
  }


  onOptionCheckedChange = (e) => {
    this.setState({ selected: e.target.value })
  }

  onOptionSubmit = (e) => {
    e.preventDefault()
    const { dispatch, authedUser, id } = this.props
    const vote = {
      authedUser, qid: id, answer: this.state.selected
    }

    dispatch(handleVoteQuestion(vote))
  }


  render() {
    const {
      author,
      question,
      authedUserHasAnwsered,
      authedUserVotedOptionOne,
      authedUserVotedOptionTwo } = this.props

    if (question === null)
      return <div> 404 not found </div>

    const votesForOptionOne = question.optionOne.votes.length
    const votesForOptionTwo = question.optionTwo.votes.length
    const total = votesForOptionOne + votesForOptionTwo

    const pieOption = {
      animationEnabled: true,
      title: {
        text: "Polling results"
      },
      data: [{
        type: "pie",
        startAngle: 0,
        indexLabel: "{label} -- {y} -- {prec}",
        dataPoints: [
          { y: votesForOptionOne, label: question.optionOne.text, prec: (votesForOptionOne / total).toLocaleString("en", {style: "percent"}) },
          { y: votesForOptionTwo, label: question.optionTwo.text, prec: (votesForOptionTwo / total).toLocaleString("en", {style: "percent"}) }
        ],
      }]
    }


    return (
        <div className='poll mx-auto'>
          <img className='avatar' src={ author.avatarURL } alt='avatar'/>
          <div> { author.name } asks: </div>
            <strong> Would you rather ... </strong>
            <form onSubmit={ (e) => this.onOptionSubmit(e) }>
              <div className="radio">
                <label>
                  <input type="radio" value="optionOne" onChange={ this.onOptionCheckedChange }
                    checked={ this.state.selected === 'optionOne' || authedUserVotedOptionOne }
                         disabled={ authedUserHasAnwsered }/>
                  { question.optionOne.text }
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="optionTwo" onChange={ this.onOptionCheckedChange }
                    checked={ this.state.selected === 'optionTwo' || authedUserVotedOptionTwo }
                         disabled={ authedUserHasAnwsered }/>
                  { question.optionTwo.text }
                </label>
              </div>

              {
                authedUserHasAnwsered ? <div> You've voted! </div> :
                <div> Your selection: { this.state.selected } </div>
              }
              <button disabled={ authedUserHasAnwsered }> Submit your Vote! </button>
            </form>


        {
          authedUserHasAnwsered && <div className='results'>
            <CanvasJSChart options={ pieOption }/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params
  const question = questions[id]

  if (question === undefined)
    return { question: null }

  return {
    question,
    author: users[question.author],
    id,
    authedUser,
    authedUserHasAnwsered: question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser),
    authedUserVotedOptionOne: question.optionOne.votes.includes(authedUser),
    authedUserVotedOptionTwo: question.optionTwo.votes.includes(authedUser)
  }
}



export default withRouter(connect(mapStateToProps)(Poll))