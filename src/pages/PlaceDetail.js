import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button, Modal, List } from 'semantic-ui-react'
import { getTargetId, poisDetail, addToSelectedPois, removeFromPois } from '../store/actions'
import { api_key } from '../api_key'

class PlaceDetail extends Component {

state = {
  clicked: true
}

handleClick = () => {
  this.props.getTargetId(this.props.id)
  fetch(`https://api.sygictravelapi.com/1.1/en/places/${this.props.id}`, {
    headers: {
      "Content-Type": 'application/json',
      "x-api-key": api_key
    },
  })
  .then(res => res.json())
  .then(detail => this.props.poisDetail(detail.data.place))
}

handleClickAdd = () => {
  this.props.addToSelectedPois(this.props.place)
  this.setState({clicked: !this.state.clicked})
}

handleClickRemove = () => {
  this.props.removeFromPois(this.props.place)
  this.setState({clicked: !this.state.clicked})
}

modalDetail = () => {
  return(this.props.detailPlace.length !== 0 ?
  <Modal trigger={<Button onClick={this.handleClick} className="ui labeled icon button"><i className="book icon" />Detail</Button>} centered={false}>
    <Modal.Header>
      {this.props.detailPlace.name}
      {this.state.clicked ? <Button className="btn" floated='right' onClick={this.handleClickAdd} content='Add' /> :
      <Button className="btn" floated='right' onClick={this.handleClickRemove} content='Remove' />}
    </Modal.Header>
    <Modal.Content>
      <img className="modalImage" size='large' alt="" src={this.props.detailPlace.main_media&&this.props.detailPlace.main_media.media[0].url} />
    <Modal.Description className="detailDescription">
        <p>{this.props.detailPlace.description.text}</p>
      </Modal.Description>
      <List divided animated>
        {this.props.detailPlace.references.find(detailPlace => detailPlace.title === "Official Website") ?
        <List.Item>
          <List.Icon name='internet explorer' size='small' verticalAlign='middle' />
          <List.Content>
            <List.Header><a href={this.props.detailPlace.references[1].url} target="_blank" rel="noopener noreferrer">Offical Website</a></List.Header>
          </List.Content>
        </List.Item> : null}
        {this.props.detailPlace.references.find(detailPlace => detailPlace.title === "Wikipedia") ?
          <List.Item>
            <List.Icon name='wikipedia w' size='small' verticalAlign='middle' />
            <List.Content>
              <List.Header><a href={this.props.detailPlace.references[0].url} target="_blank" rel="noopener noreferrer">Wikipedia Page</a></List.Header>
            </List.Content>
          </List.Item> : null}
        {this.props.detailPlace.references.find(detailPlace => detailPlace.title === "Facebook") ?
        <List.Item>
          <List.Icon name='facebook square' size='small' verticalAlign='middle' />
          <List.Content>
            <List.Header><a href={this.props.detailPlace.references[2].url} target="_blank" rel="noopener noreferrer">Facebook Page</a></List.Header>
          </List.Content>
        </List.Item> : null}
      </List>
    </Modal.Content>
  </Modal> : <Button onClick={this.handleClick} className="ui labeled icon button"><i className="book icon" />Detail</Button>)
}

  render() {
    return (
      <Card className="card">
        <Image src={this.props.place.thumbnail_url} />
        <Card.Content className="cardContent">
          <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Description>{this.props.place.perex && this.props.place.perex.slice(0, 100 - this.props.place.name.length) + "..."}</Card.Description>
            <div className="show-page-button-group">
            {this.state.clicked ?
              <Button.Group className="btngroup" basic color='blue' vertical labeled icon size="mini">
                <Button onClick={this.handleClickAdd} labelPosition='left' icon='paper plane outline' content='Add' />
                {this.modalDetail()}
              </Button.Group>
                :
              <Button.Group className="btngroup" basic color='blue' vertical labeled icon size="mini">
                <Button onClick={this.handleClickRemove} labelPosition='left' icon='paper plane outline' content='Remove' />
                {this.modalDetail()}
              </Button.Group>
            }
          </div>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    targetDetailId: state.placeReducer.targetDetailId,
    detailPlace: state.placeReducer.detailPlace
  }
}


export default connect(mapStateToProps, {poisDetail, getTargetId, addToSelectedPois, removeFromPois})(PlaceDetail);
