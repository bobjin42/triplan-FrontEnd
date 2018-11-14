import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import TravelPlan from './TravelPlan';
import { img } from '../icon/profile.jpeg';
import { addTravelPlan } from '../store/actions'

class Profile extends Component {

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.props.addTravelPlan(data.trips.filter(travelPlan => {
        return(travelPlan.plans.length !== 0 && travelPlan.plans[0].end_time)
      })))
  }

  render() {
    const { name, email_address, usertravelPlan } = this.props
    return (
      <div className="opcailty">
        <div className="profile_card">
          <Card className="profile">
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>{email_address}</Card.Description>
            </Card.Content>
          </Card>
          <TravelPlan travelPlan={usertravelPlan}/>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return{
    username: state.usersReducer.user.username,
    name: state.usersReducer.user.name,
    email_address: state.usersReducer.user.email_address,
    id: state.usersReducer.user.id,
    usertravelPlan: state.usersReducer.usertravelPlan
  }
}



export default withAuth(connect(mapStateToProps, {addTravelPlan})(Profile))
