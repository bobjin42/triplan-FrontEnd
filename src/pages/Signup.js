import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { signupUser } from '../store/actions'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'

class Signup extends Component {

  state = {
    name: "",
    email_address: "",
    username: "",
    password: ""
  }

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleSubmit = () => {
  this.props.signupUser(this.state.username, this.state.password, this.state.name, this.state.email_address)
}

  render() {
    if(this.props.loggedIn){
        return <Redirect to="/" />
      } else {
        return (
          <div className="background">
            <Segment className="loginForm">
              <Form size="mini" onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Field className="loginInput">
                    <label>Name</label>
                    <input placeholder='Name' onChange={this.handleChange} name="name" value={this.state.name}/>
                  </Form.Field>
                  <Form.Field className="loginInput">
                    <label>Email</label>
                    <input placeholder='Email' onChange={this.handleChange} name="email_address" value={this.state.email_address}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field className="loginInput">
                    <label>UserName</label>
                    <input placeholder='UserName' onChange={this.handleChange} name="username" value={this.state.username}/>
                  </Form.Field>
                  <Form.Field className="loginInput">
                    <label>Password</label>
                    <input placeholder='Password' onChange={this.handleChange} name="password" value={this.state.password}/>
                  </Form.Field>
                </Form.Group>
                <Button size="tiny" className="loginbtn" type='submit'>Submit</Button>
              </Form>
            </Segment>
          </div>
      );
    }
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, {signupUser})(Signup))
