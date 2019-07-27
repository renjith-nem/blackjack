import React, { Component } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

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
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Card className="text-center">
              <Card.Header></Card.Header>
              <Card.Body>
                <Card.Title>BlackJack</Card.Title>
                <Card.Text>Login to your account</Card.Text>
                <Form onSubmit={this.handleLoginClick}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  handleUsernameChange = (event: any) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: any) => {
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
        if (resp.authenticated) {
          this.props.history.push('/rooms');
        } else {
          alert('Invalid Username and password..');
        }
      });
  };
}

export default LoginContainer;
