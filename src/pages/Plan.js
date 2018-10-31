import React, { Component } from 'react';
import MapWrapper from '../components/MapWrapper'
import { Grid } from 'semantic-ui-react'
import SelectedPOIs from '../components/SelectedPOIs'

class Plan extends Component {

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Column width={10}>
          <SelectedPOIs />
        </Grid.Column>
        <Grid.Column width={6}>
          <MapWrapper />
        </Grid.Column>
      </Grid>
    );
  }

}

export default Plan;
