import React, { Component, Fragment } from 'react';
import PlaceDetail from './PlaceDetail';
import { Card, Tab, Button, Label, Item, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchCityDetail, fetchTripId } from '../store/actions';
import { withRouter } from 'react-router';

const Container = styled.div`
  padding: 10px;
  background-color: white
`;

class Show extends Component {

componentDidMount(){
  this.props.dispatch(fetchCityDetail())
}

goToPlan = () => {
  this.props.dispatch(fetchTripId())
  this.props.history.push('/plan')
}


  render() {
    const panes = [
      { menuItem: {content:'POIs', icon: "heart"}, render: () => <Tab.Pane>
        {this.props.selectedPlaces.map(place => <span className="labelpoi" ><Label image ><img src={place.thumbnail_url} />{place.name}</Label></span>)}
        {this.props.selectedPlaces.length === 0 ? null : <Button icon='hand point right outline' className="selectedpois_btn" secondary onClick={this.goToPlan}/>}</Tab.Pane>
      },
      { menuItem: {content:'City Detail', icon: "book"}, render: () => <Tab.Pane>
      {this.props.detailCity[0]  ?
        <Fragment>
          <Item>
            <Item.Image className="cityDetailImg" size='tiny' src={this.props.detailCity[0].data.place.main_media.media[0].url}/>
            <Item.Content verticalAlign='middle'>
            <Item.Header as="h3" className="citydetailHeader">{this.props.detailCity[0].data.place.name}</Item.Header>
            <Item.Description>
              <p>{this.props.detailCity[0].data.place.description.text}</p>
            </Item.Description>
            </Item.Content>
          </Item>
          <Item.Extra>
            <Label size="small" className="cityLabel">
              <Icon name='internet explorer'/>
              <a href={this.props.detailCity[0].data.place.references[1].url} target="_blank" rel="noopener noreferrer"> Offical Page </a>
            </Label>
            <Label size="small" className="cityLabel">
              <Icon name='wikipedia w'/>
              <a href={this.props.detailCity[0].data.place.references[0].url} target="_blank" rel="noopener noreferrer"> Wikipedia Page </a>
            </Label>
            <Label size="small" className="cityLabel">
              <Icon name='bookmark'/>
              <a href={this.props.detailCity[0].data.place.references[2].url} target="_blank" rel="noopener noreferrer"> Tour Guide Page </a>
            </Label>
            <Label size="small" className="cityLabel">
              <Icon name='subway'/>
              <a href={this.props.detailCity[0].data.place.references[3].url} target="_blank" rel="noopener noreferrer"> Subway Map </a>
            </Label>

          </Item.Extra>
        </Fragment>
      : null}
      </Tab.Pane> },
      { menuItem: {content:'Shared plans', icon:"share square"}, render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
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
      isLoading: state.placeReducer.isLoading
    }
  }


export default connect(mapStateToProps)(withRouter(Show))
