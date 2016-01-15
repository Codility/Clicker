import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { counter : 1, nick : null }
  }
  render() {
    if (this.state.nick === null) {
      return <LoginForm/>
    }

    return (
      <div>
        <h1>Counter: {this.state.counter }.</h1>
        <button onClick={this.increment.bind(this)}> Increment </button>
      </div>
    );
  }

  increment() {
    this.setState({ counter : this.state.counter + 1 })
  }
}

class LoginForm extends Component {
  render() {
    return (
      <div className="form-group">
        <h1>Welcome</h1>
        <label>Name:</label>
        <input ref="nick" className="form-control"/>
        <br/>
        <button className="btn btn-primary" onClick={this.login.bind(this)}>Login</button>
      </div>
    )
  }
  login() {
  }

}
