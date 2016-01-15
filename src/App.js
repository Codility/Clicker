import React, { Component } from 'react';

var scores = new Firebase("https://amber-inferno-5262.firebaseio.com/clicker/scores/");

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = { counter : 1, nick : null,
      users : { 'Jakub' : 50, 'Kos' : 50, 'Marcin' : 60 },
      speed : 0,
      start_time : null
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.increment(0);
    }, 100);
    setInterval(() => {
      this.updateDB();
    }, 300);
    scores.on('value', snapshot => {
      let scoresData = snapshot.val();
      let newUsers = Object.keys(scoresData).reduce((out, key) => {
        out[key] = scoresData[key].speed;
        return out;
      }, {});
      this.setState({'users': newUsers});
    });

  }

  render() {
    if (this.state.nick === null) {
      return <LoginForm onLogin={this.login.bind(this)}/>
    }

    return (
      <div className='row'>
        <div className='col-md-6'>
          <button className="btn btn-primary btn-lg btn-block" style={{ height : 200 }}  onClick={this.increment.bind(this, 1)}>Hit!</button>
          <h1> Your speed is { this.state.speed.toFixed(2)} Hz!</h1>
        </div>
        <div className='col-md-6'>
          <UsersTable users={this.state.users}/>
        </div>
      </div>
    )
  }

  getSpeed() {
    return 1000 * this.state.counter / (new Date().getTime() - this.state.start_time)
  }

  increment(n) {
    if (this.state.start_time === null) {
      this.setState({ start_time : new Date().getTime() })
    }
    this.setState({ counter : this.state.counter + n })
    let speed = this.getSpeed()
    this.setState({ speed : speed })
  }

  updateDB() {
    if (!this.state.nick) {
      return;
    }
    scores.update({
      [this.state.nick]: {
        "speed": this.state.speed
      }
    });
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
          <th>Nick</th>
          <th>Speed</th>
        </tr>
        {usersTable.map(x => <tr key={x.nick}><td>{x.nick}</td><td>{x.speed.toFixed(2)} Hz</td></tr>)}
      </tbody>
    </table>
  )
}
