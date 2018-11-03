import React, { Component } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card, Tab, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { addPlaces } from '../store/actions';
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  padding: 10px;
`;

class Show extends Component {

componentDidMount() {
  fetch("http://localhost:3001/api/v1/locations")
  .then(res => res.json())
  .then(places => {
    this.props.fetchPlaces(places)
  })
}

  render() {
    const panes = [
      { menuItem: 'City Detail', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'POIs for planging', render: () => <Tab.Pane>{this.props.selectedPlaces.map(place => <p key={place.id}>{place.name}</p>)}<NavLink exact to='/plan'><Button primary>Go to plan</Button></NavLink></Tab.Pane> },
      { menuItem: 'Shared plans', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
    return(
      <Container>
        <Tab panes={panes} />
        <Card.Group itemsPerRow={5}>
          {this.props.places.map(place => {
            return <PlaceDetail selectedpois={this.selectedpois} removepois={this.removepois} key={place.id} id={place.api_id} place={place}/>
          })}
        </Card.Group>
      </Container>
    )
  }
}

  function mapStateToProps(state) {
    return {
      places: state.places,
      selectedPlaces: state.selectedPlaces
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchPlaces: (places) => {
        dispatch(addPlaces(places))
      },
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Show)
