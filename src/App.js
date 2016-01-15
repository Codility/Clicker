import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { counter : 1, nick : null,
      users : { 'Jakub' : 50, 'Kos' : 50, 'Marcin' : 60 }}
  }
  render() {
    if (this.state.nick === null) {
      return <LoginForm onLogin={this.login.bind(this)}/>
    }

    return (
      <div className='row'>
        <div className='col-md-8'>
        </div>
        <div className='col-md-4'>
          <UsersTable users={this.state.users}/>
        </div>
      </div>
    )
   /* return (
      <div>
        <h1>Counter: {this.state.counter }.</h1>
        <button onClick={this.increment.bind(this)}> Increment </button>
      </div>
    );*/
  }

  increment() {
    this.setState({ counter : this.state.counter + 1 })
  }

  login(nick) {
    this.setState({ nick : nick })
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
        <button className="btn btn-primary" onClick={this.onClick.bind(this)}>Login</button>
      </div>
    )
  }
  onClick() {
    this.props.onLogin(this.refs.nick.value);
  }
}

function UsersTable(props) {

  let usersTable = []
  for (let nick of Object.keys(props.users)) {
    usersTable.push({ nick : nick, speed : props.users[nick]})
  }

  usersTable.sort( (a, b) => a.speed - b.speed)

  return (
    <table className='table table-striped'>
      <tbody>
        <tr>
          <th> Nick </th>
          <th> Speed </th>
        </tr>
        {usersTable.map(x => <tr> <td> {x.nick} </td><td> {x.speed} </td></tr>)}
      </tbody>
    </table>
  )
}
