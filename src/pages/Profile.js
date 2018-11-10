import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class Profile extends Component {

  state = {
    usertravelPlan: []
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.setState({
      usertravelPlan: data.trips
    }))
  }

  render() {
    const { name, username, email_address } = this.props
    return (
      <Fragment>
        <div className="profile_card">
          <Card >
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>{email_address}</Card.Description>
            </Card.Content>
          </Card>
        </div>

      </Fragment>
    );
  }

}

const mapStateToProps = ({ usersReducer: { user: { username, name, email_address, id } } }) => ({
  username,
  name,
  email_address,
  id
})


export default withAuth(connect(mapStateToProps)(Profile))
