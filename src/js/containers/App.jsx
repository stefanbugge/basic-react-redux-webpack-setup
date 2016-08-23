import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import * as GreetingActions from '../actions/greeting'

// Load Sass styles. Webpack takes care of the rest
import "./../../styles/main.scss"

class App extends Component {

  static propTypes = {
    greeting: PropTypes.string,
    timestamp: PropTypes.number
  }

  componentDidMount() {
    const { greetingActions } = this.props
    greetingActions.makeGreeting("redux is working!")
  }

  clickHandler(e) {
    const { greetingActions } = this.props
    greetingActions.makeGreeting("foo bar")
  }

  render() {
    const { greeting, timestamp } = this.props
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Hello from React</h1>
          <p>
            <span>Greeting from redux: <strong>{greeting}</strong></span>
            <span> - { timestamp && moment(timestamp).format("HH:mm:ss")}</span>
          </p>
          <p>Type <strong>alt+h</strong> to see the redux devtools sidebar</p>
          <p className="sass-test">If this is green then <strong>Sass</strong> is working as well</p>
          <button className="btn btn-primary" onClick={this.clickHandler.bind(this)}>Boostrap button</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    greeting: state.greeting.text,
    timestamp: state.greeting.timestamp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    greetingActions: bindActionCreators(GreetingActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
