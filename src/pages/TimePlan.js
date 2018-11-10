import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button } from 'semantic-ui-react'
import TimePlanRow from './TimePlanRow'
import { updatePlan } from '../store/actions'

class TimePlan extends Component {

  handleSubmit = () => {
    this.props.updatePlan(this.props.plan)
  }

  render() {
    const placesIds = this.props.schedualPlaces;

    return (
      <Fragment>
      <Form onSubmit={this.handleSubmit} className="timeplantable">
        <Table selectable fixed basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={5}>Name</Table.HeaderCell>
              <Table.HeaderCell width={5}>Description</Table.HeaderCell>
              <Table.HeaderCell width={3}>Schedual</Table.HeaderCell>
              <Table.HeaderCell width={3}>notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.planIns.map(plan => {
              return <TimePlanRow tripId={this.props.tripId} plan_id={plan.id} place={plan.location} key={plan.id} id={plan.id} />
            })}
          </Table.Body>
        </Table>
        <Button type="submit" className="detailbtn" fluid>Confirm my Plan</Button>
      </Form>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return{
    schedualPlaces: state.placeReducer.schedualPlaces,
    places: state.placeReducer.places,
    plan: state.planReducer.plan,
    tripId: state.placeReducer.tripId,
    user: state.usersReducer.user,
    planIns: state.planReducer.planIns
  }
}

export default connect(mapStateToProps, { updatePlan })(TimePlan)
