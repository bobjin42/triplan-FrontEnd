import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

class PlaceDetail extends Component {

  render() {
    return (
      <Card>
        <Image src={this.props.place.thumbnail_url} />
        <Card.Content>
          <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Description>{this.props.place.perex}</Card.Description>
        </Card.Content>
      </Card>
    );
  }

}

export default PlaceDetail;
