import React, { Component } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux'
import styled from 'styled-components';
// import { addPlaces } from '../store/actions'

const Container = styled.div`
  padding: 10px;
`;

class Show extends Component {

  state = {
    places: [],
    SelectedPOIs: []
  }

componentDidMount() {
  fetch("http://localhost:3001/api/v1/locations")
  .then(res => res.json())
  .then(places => this.setState({
    places
  }))
}

selectedpois = (place) => {
  this.setState({
    SelectedPOIs: [...this.state.SelectedPOIs, place]
  })
}

removepois = (place) => {
  this.setState({
    SelectedPOIs: [...this.state.SelectedPOIs].filter(target => {
      return target.name !== place.name
    })
  })
}

  render() {
    const panes = [
      { menuItem: 'City Detail', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'POIs for planging', render: () => <Tab.Pane>{this.state.SelectedPOIs.map(place => <p key={place.id}>{place.name}</p>)}</Tab.Pane> },
      { menuItem: 'Shared plans', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
    return(
      <Container>
        <Tab panes={panes} />
        <Card.Group itemsPerRow={5}>
          {this.state.places.map(place => {
            return <PlaceDetail selectedpois={this.selectedpois} removepois={this.removepois} key={place.id} id={place.api_id} place={place}/>
          })}
        </Card.Group>
      </Container>
    )
  }
}

export default Show;
