import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' onChange={this.handleChange} name="name" value={this.state.name}/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' onChange={this.handleChange} name="email_address" value={this.state.email_address}/>
        </Form.Field>
        <Form.Field>
          <label>UserName</label>
          <input placeholder='UserName' onChange={this.handleChange} name="username" value={this.state.username}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' onChange={this.handleChange} name="password" value={this.state.password}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
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
