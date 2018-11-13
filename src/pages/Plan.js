import React, { Component } from 'react';
import MapWrapper from '../components/MapWrapper'
import { Grid } from 'semantic-ui-react'
import SelectedPOIs from '../components/SelectedPOIs'
import { Button } from 'semantic-ui-react'

class Plan extends Component {

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Column width={1} style={{"backgroundColor" : "#E4E4E4"}}>

        </Grid.Column>
        <Grid.Column width={9} style={{"backgroundColor" : "#E4E4E4"}}>
          <SelectedPOIs />
        </Grid.Column>
        <Grid.Column width={6} style={{"backgroundColor" : "#E4E4E4"}}>
          <MapWrapper />
        </Grid.Column>
      </Grid>
    );
  }

}

export default Plan;
