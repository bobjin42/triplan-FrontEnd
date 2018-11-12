import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../store/actions'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class Login extends React.Component {
  state = { username: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }

  render() {
    if(this.props.loggedIn){
        return <Redirect to="/" />
      } else {
        return (<Segment className="loginForm">
            <Form
              onSubmit={this.handleLoginSubmit}
              size="mini"
              key="mini"
              loading={this.props.authenticatingUser}
              error={this.props.failedLogin}
              >
              <Message error header={this.props.failedLogin ? this.props.error : null} />
              <Form.Group>
                <Form.Input
                  className="loginInput"
                  label="username"
                  placeholder="username"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                  />
                <Form.Input
                  className="loginInput"
                  type="password"
                  label="password"
                  placeholder="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  />
              </Form.Group>
              <Button type="submit" className="loginbtn">Login</Button>
            </Form>
        </Segment>)
      }
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})
export default withRouter(connect(mapStateToProps, { loginUser })(Login))
