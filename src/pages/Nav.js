import React, { Component, Fragment } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCurrentUser, logout } from '../store/actions'

class Nav extends Component {

  componentDidMount() {
    if (localStorage.getItem('jwt')&&!this.props.user.loggedIn) {
      this.props.fetchCurrentUser()
    }
  }

  handleOut = () => {
    localStorage.clear()
    this.props.history.push("/login")
    this.props.logout()
  }


  render() {
    const { user: { loggedIn }, location: { pathname } } = this.props
    return (
      <Segment inverted className="navbar">
        <Menu size="small" inverted pointing secondary >
        {loggedIn ? (
          <Fragment>
            <Menu.Item as={NavLink} to='/' name='Home' active={pathname === '/'} />
            <Menu.Item as={NavLink} to='/show' name='Show' active={pathname === '/show'} />
            <Menu.Item as={NavLink} to='/plan' name='Plan' active={pathname === '/plan'}/>
            <Menu.Menu position="right">
            <Menu.Item as={NavLink} to='/profile' active={pathname === '/profile'}>{this.props.user.user ? `Hi ${this.props.user.user.name}` : null}</Menu.Item>
            <Menu.Item><Button onClick={this.handleOut}>Logout</Button></Menu.Item>
            </Menu.Menu>
          </Fragment>
        ) : (
          <Fragment>
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
              <Menu.Item as={NavLink} to="/signup" name="Signup" active={pathname === '/signup'} />
            </Menu.Menu>
          </Fragment>
        )}
        </Menu>
      </Segment>
    )
  }

}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps, {fetchCurrentUser, logout})(Nav));
