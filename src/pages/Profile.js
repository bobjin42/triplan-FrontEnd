import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, Image, Accordion, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import TravelPlan from './TravelPlan';
import { img } from '../icon/profile.jpeg'

class Profile extends Component {

  state = {
    usertravelPlan: [],
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
      <Fragment className="opcailty">
        <img src={img} />
        <div className="profile_card">
          <Card className="profile">
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>{email_address}</Card.Description>
            </Card.Content>
          </Card>
          <TravelPlan travelPlans={this.state.usertravelPlan.filter(travelPlan => {
              return travelPlan.plans.length !== 0 && travelPlan.plans[0].end_time
            })} />
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
