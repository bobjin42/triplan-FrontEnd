import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import Video from '../icon/Untitled.mp4'
import { Icon, Input, Modal, Button } from 'semantic-ui-react'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startDateTrip, endDateTrip, targetPlaceUpdate, createTrip } from '../store/actions'

const Container = styled.div`
  opacity: 0.9;
  color: rgba(0, 0, 0, 0.87);
  background-color: white;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Metropolis, Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 10px;
  z-index: 1;
  width: 250px;
  margin: 10px 20px 200px;
  padding: 20px 20px 20px 20px;
  display: inline-block;
  text-align: left;
`;

class Home extends Component {

  handleSelect = (range) => {
    this.props.updateStartDate(format(range.startDate._d, 'YYYY/MM/DD'))
    this.props.updateEndDate(format(range.endDate._d, 'YYYY/MM/DD'))
  }

  handleChange = (e) => {
    this.props.updateTargetPlace(e.target.value)
  }

  goToShow = () => {
    this.props.createTripInfo(this.props.user.id, this.props.targetPlace, this.props.startDateTrip, this.props.endDateTrip)
    this.props.history.push('/show')
  }

  render() {
    const video = {
      src: '../icon/Untitled.mp4'
    }
    return (
      <Fragment>
        <div className="homeContainer">
          <div className="slogansPosition">
            <h1 className="slogans">Travel is the only thing you buy</h1>
            <h1 className="slogans">that makes you rich :)</h1>
          </div>
          <video id="background-video" loop autoPlay>
           <source src={Video} type="video/mp4" />
           <source src={Video} type="video/ogg" />
          </video>
          <div>
            <Container className="searchContainer">
              <Input onChange={this.handleChange} icon='plane' iconPosition='left' placeholder='Search places...' value={this.props.targetPlace} />
              <Modal trigger={<Input icon="calendar alternate outline" iconPosition='left' placeholder='Select your travel date ...'
                value={this.props.startDateTrip && this.props.endDateTrip ? this.props.startDateTrip + " ~ " + this.props.endDateTrip : ""}/>}>
                <DateRange
                  onInit={this.handleSelect}
                  onChange={this.handleSelect}
                  />
              </Modal>
              <Button onClick={this.goToShow} attached='bottom'>Start My Journey</Button>
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return{
    user: state.usersReducer.user,
    startDateTrip: state.tripReducer.startDate,
    endDateTrip: state.tripReducer.endDate,
    targetPlace: state.tripReducer.targetPlace,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateStartDate: (date) => {
      dispatch(startDateTrip(date))
    },
    updateEndDate: (date) => {
      dispatch(endDateTrip(date))
    },
    updateTargetPlace: (place) => {
      dispatch(targetPlaceUpdate(place))
    },
    createTripInfo: (user_id, trip_title, start_date, end_date) => {
      dispatch(createTrip(user_id, trip_title, start_date, end_date))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
