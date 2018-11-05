import React, { Component } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card, Tab, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { addPlaces } from '../store/actions';
import { withRouter } from 'react-router';

const Container = styled.div`
  padding: 10px;
`;

class Show extends Component {

  state = {
    detailPlace: [],
    targetId: ""
  }

componentDidMount() {
  fetch("http://localhost:3001/api/v1/locations")
  .then(res => res.json())
  .then(places => {
    this.props.fetchPlaces(places)
  })
  fetch('http://localhost:5000/detail')
  .then(res => res.json())
  .then(data => {
    this.setState({
      detailPlace: data
    })
  })
}

goToPlan = () => {
  this.props.history.push('/plan')
}

targerDetailPlace = (id) => {
  this.setState({
    targetId: id
  })
}

  render() {
    console.log(this.state.detailPlace);
    const panes = [
      { menuItem: 'City Detail', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'POIs for planging', render: () => <Tab.Pane>
        {this.props.selectedPlaces.map(place => <Label color='teal' tag key={place.id}>{place.name}</Label>)}
        {this.props.selectedPlaces.length === 0 ? null : <Button className="selectedpois_btn" secondary size="tiny" onClick={this.goToPlan}>Go to plan</Button>}</Tab.Pane>
      },
      { menuItem: 'Shared plans', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
    return(
      <Container>
          <Tab panes={panes} />
        <Card.Group itemsPerRow={5}>
          {this.props.places.map(place => {
            return <PlaceDetail targerDetailPlace={this.targerDetailPlace} detailPlace={this.state.detailPlace[0].data.place} selectedpois={this.selectedpois} removepois={this.removepois} key={place.id} id={place.api_id} place={place}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Show))
