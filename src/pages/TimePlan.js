import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Form, Button } from 'semantic-ui-react'
import TimePlanRow from './TimePlanRow'

class TimePlan extends Component {

  state = {
    planDetail:[]
  }


  handlePlaninfo = (data) => {
    const newPlanDetail = [...this.state.planDetail];
      newPlanDetail.find(plan => {
        if (plan.id == data.id) {
          plan = data
          this.setState({
            planDetail: newPlanDetail
          })
        } else {
          this.setState({
            planDetail: [newPlanDetail, data]
          })
        }
      })
      // let newState = [...this.state.planDetail]
      // let plan = newState.find(plan => plan.id == data.id)
      // // console.log("plan ", plan);
      // // console.log("plan ", plan);
      // if(plan){
      //   plan = data
      //   this.setState({
      //     planDetail: newState
      //   })
      // } else {
      //   this.setState({
      //     planDetail: [...this.state.planDetail, data]
      //   })
      // }
    }

  handleSubmit = (e) => {
    // console.log(this.state);
  }

  render() {
    const placesIds = this.props.schedualPlaces;
    const placesInstance = placesIds.map(id => {
      return this.props.places.find(place => {
        return place.api_id == id
      })
    })
    console.log("state ", this.state);
    return (
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
            {placesInstance.map(place => {
              return <TimePlanRow handlePlaninfo={this.handlePlaninfo} place={place} key={place.id} id={place.api_id} />
            })}
          </Table.Body>
        </Table>
        <Button fluid>Confirm my Plan</Button>
      </Form>
    );
  }

}

function mapStateToProps(state) {
  return{
    schedualPlaces: state.placeReducer.schedualPlaces,
    places: state.placeReducer.places
  }
}

export default connect(mapStateToProps)(TimePlan)
