import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button, Modal, List } from 'semantic-ui-react'
import { addToSelectedPois, removeFromPois } from '../store/actions'

class PlaceDetail extends Component {

state = {
  clicked: true
}

handleClick = () => {
  this.props.targerDetailPlace(this.props.id)
}

handleClickAdd = () => {
  this.props.dispatch(addToSelectedPois(this.props.place))
  this.setState({clicked: !this.state.clicked})
}

handleClickRemove = () => {
  this.props.dispatch(removeFromPois(this.props.place))
  this.setState({clicked: !this.state.clicked})
}

  render() {
    const { detailPlace } = this.props
    const modalDetail = () => {
      return <Modal trigger={<Button onClick={this.handleClick} className="ui labeled icon button"><i className="book icon"></i>Detail</Button>} centered={false}>
        <Modal.Header>{detailPlace.name}</Modal.Header>
        <Modal.Content>
          <img className="modalImage" size='large' alt="" src={detailPlace.main_media.media[0].url} />
        <Modal.Description className="detailDescription">
            <p>{detailPlace.description.text}</p>
          </Modal.Description>
          <List divided animated>
            <List.Item>
              <List.Icon name='internet explorer' size='small' verticalAlign='middle' />
              <List.Content>
                <List.Header><a href={detailPlace.references[1].url} target="_blank" rel="noopener noreferrer">Offical Website</a></List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='wikipedia w' size='small' verticalAlign='middle' />
              <List.Content>
                <List.Header><a href={detailPlace.references[0].url} target="_blank" rel="noopener noreferrer">Wikipedia Page</a></List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='facebook square' size='small' verticalAlign='middle' />
              <List.Content>
                <List.Header><a href={detailPlace.references[2].url} target="_blank" rel="noopener noreferrer">Facebook Page</a></List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Modal.Content>
      </Modal>
    }
    return (
      <Card className="card">
        <Image src={this.props.place.thumbnail_url} />
        <Card.Content className="cardContent">
          <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Description>{this.props.place.perex}</Card.Description>
            {this.state.clicked ?
              <Button.Group className="btn" basic color='blue' vertical labeled icon size="mini">
                <Button className="btn" onClick={this.handleClickAdd} labelPosition='left' icon='paper plane outline' content='Add' />
                {modalDetail()}
              </Button.Group>
                :
              <Button.Group className="btn" basic color='blue' vertical labeled icon size="mini">
                <Button className="btn" onClick={this.handleClickRemove} labelPosition='left' icon='paper plane outline' content='Remove' />
                {modalDetail()}
              </Button.Group>
            }
        </Card.Content>
      </Card>
    );
  }
}


export default connect()(PlaceDetail);
