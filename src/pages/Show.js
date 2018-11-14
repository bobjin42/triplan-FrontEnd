import React, { Component, Fragment } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card, Tab, Button, Label, Item, Icon, Modal, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchTripId, fetchTrips } from '../store/actions';
import { withRouter } from 'react-router';

const Container = styled.div`
  padding: 10px;
  background-color: white
`;

class Show extends Component {

componentDidMount(){
  this.props.dispatch(fetchTrips())
}

goToPlan = () => {
  this.props.dispatch(fetchTripId())
  this.props.history.push('/plan')
}


  render() {
    const avaiableTrips = this.props.allTrips.filter(travelPlan => {
        return travelPlan.plans.length !== 0 && travelPlan.plans[0].end_time
      })
    const targetTrips = avaiableTrips.filter(trip => {
      return trip.trip_title === this.props.targetPlace
    })
    const city_detail = this.props.places[0]
    console.log(targetTrips);
    const panes = [
      { menuItem: {content:'POIs', icon: "heart"}, render: () => <Tab.Pane>
        {this.props.selectedPlaces.map(place => <span className="labelpoi" ><Label image ><img src={place.thumbnail_url} alt="label"/>{place.name}</Label></span>)}
        {this.props.selectedPlaces.length === 0 ? null : <Button icon='hand point right outline' className="selectedpois_btn" secondary onClick={this.goToPlan}/>}</Tab.Pane>
      },
      { menuItem: {content:'City Detail', icon: "book"}, render: () => <Tab.Pane>
      {city_detail.city  ?
        <Fragment>
          <Item>
            <Item.Image className="cityDetailImg" size='tiny' src={city_detail.city.img}/>
            <Item.Content verticalAlign='middle'>
            <Item.Header as="h3" className="citydetailHeader">{city_detail.city.name}</Item.Header>
            <Item.Description>
              <p>{city_detail.city.description}</p>
            </Item.Description>
            </Item.Content>
          </Item>
          <Item.Extra>
          {city_detail.city.website ?
             (<Label size="small" className="cityLabel">
                          <Icon name='chrome'/>
                          <a href={city_detail.city.website} target="_blank" rel="noopener noreferrer"> Offical Page </a>
                        </Label>) : null}

          {city_detail.city.wikipedia ?
             (<Label size="small" className="cityLabel">
                        <Icon name='wikipedia w'/>
                        <a href={city_detail.city.wikipedia} target="_blank" rel="noopener noreferrer"> Wikipedia Page </a>
                      </Label>) : null}

          {city_detail.city.guide ?
             (<Label size="small" className="cityLabel">
                          <Icon name='bookmark'/>
                          <a href={city_detail.city.guide} target="_blank" rel="noopener noreferrer"> Guide Page </a>
                        </Label>) : null}

          {city_detail.city.subway_map ?
            (<Label size="small" className="cityLabel">
                          <Icon name='subway'/>
                          <a href={city_detail.city.subway} target="_blank" rel="noopener noreferrer"> Subway Map </a>
                        </Label>) : null}
          </Item.Extra>
        </Fragment>
      : null}
      </Tab.Pane> },
      { menuItem: {content:'Shared plans', icon:"share square"}, render: () => <Tab.Pane>
      {targetTrips.map(trip => {
        return(
          <Modal trigger={<Button>Show Trip Detail</Button>}>
            <Modal.Header>{trip.trip_title + " " + trip.start_date + " ~ " + trip.end_date}</Modal.Header>
            <Modal.Description>
              {trip.plans.map(plan => {
                return(
                  <List>
                    <List.Item>
                      <List.Content>
                        <List.Header>{plan.location_name}</List.Header>
                        <List.Description>{plan.start_time && plan.end_time ? (plan.start_time.replace(/[a-zA-Z]+/g, " ").slice(0, -8) + " ~ " + plan.end_time.replace(/[a-zA-Z]+/g, " ").slice(0, -8)) : null}</List.Description>
                        <List.Description>{plan.note}</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                )
              })}
            </Modal.Description>
          </Modal>)})}
      </Tab.Pane> },
    ]
      return (
         <Container style={{backgroundColor: "#E4E4E4"}}>
            <Tab panes={panes} />
          <Card.Group itemsPerRow={5}>
            {this.props.places ? this.props.places.map(place => {
              return <PlaceDetail key={place.id} id={place.api_id} place={place}/>
            }) : null}
          </Card.Group>
        </Container>
      )
  }
}

  function mapStateToProps(state) {
    return {
      places: state.placeReducer.places,
      selectedPlaces: state.placeReducer.selectedPlaces,
      detailCity: state.placeReducer.detailCity,
      detailPlace: state.placeReducer.detailPlace,
      targetPlace: state.tripReducer.targetPlace,
      isLoading: state.placeReducer.isLoading,
      allTrips: state.tripReducer.allTrips
    }
  }


export default connect(mapStateToProps)(withRouter(Show))
