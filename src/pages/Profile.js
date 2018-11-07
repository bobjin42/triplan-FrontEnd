import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = ({ name, username, email_address }) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Description>{username}</Card.Description>
    </Card.Content>
  </Card>
)

const mapStateToProps = ({ usersReducer: { user: { username, name, email_address } } }) => ({
  username,
  name,
  email_address
})


export default withAuth(connect(mapStateToProps)(Profile))
