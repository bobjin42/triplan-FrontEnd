import React, { Component } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card } from 'semantic-ui-react';

class Show extends Component {

  state = {
    places: []
  }

componentDidMount() {
  fetch("http://localhost:3001/api/v1/locations")
  .then(res => res.json())
  .then(data => this.setState({
    places: data
    }
  ))
}

  render() {
    return(
      <Card.Group itemsPerRow={5}>
        {this.state.places.map(place => {
        return <PlaceDetail key={place.id} place={place}/>
        })}
      </Card.Group>
    )
  }


}

export default Show;
