import React, { Component } from 'react';

class LoginContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  render() {
    console.log('dsff');
    return (
      <div>
        <form onSubmit={this.handleLoginClick}>
          <label>
            Username:
            <input
              type="text"
              value={this.state.row}
              name="username"
              onChange={this.handleUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.column}
              onChange={this.handlePasswordChange}
            />
          </label>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    );
  }

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleLoginClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.authenticate(this.state.username, this.state.password);
  };

  authenticate = (username: String, password: String) => {
    fetch('/users/auth', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        console.log(resp);
        if (resp.authenticated) {
          this.props.history.push('/');
        } else {
          alert('Invalid Username and password..');
        }
      });
  };
}

export default LoginContainer;
