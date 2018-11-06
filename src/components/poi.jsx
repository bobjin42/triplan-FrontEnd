import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'
import { Modal, Input, Button, Divider, Header, Icon } from 'semantic-ui-react';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#c1f0f0' : 'white')}
`;

class Poi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
      modalOpen: false
    };
  }

  handleStartChange = (e) => {
    this.setState({
      startTime: e.target.value
    })
  }

  handleEndChange = (e) => {
    this.setState({
      endTime: e.target.value
    })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleOpen = () => {
    this.setState({
      modalOpen: true
    })
  }

  render() {
    return (
      <Fragment>
        {this.state.startTime && this.state.endTime !== "" ?
          <div>
            <Divider fitted/>
            <Header as='h5'>
              <Icon size="tiny" name='telegram plane' />
              <Header.Content>{this.state.startTime + ' ~ ' + this.state.endTime}</Header.Content>
            </Header>
          </div> : null}
          <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
              <Modal size="small" trigger={
                  <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={this.handleOpen}
                    isDragging={snapshot.isDragging}>
                    {this.props.task.name}
                  </Container>}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  basic
                  >
                <Modal.Content>
                  <Input size="small" icon='clock' placeholder='Start Time' className="timeSelect" onChange={this.handleStartChange} value={this.state.startTime}/>
                  <Input size="small" icon='clock' placeholder='End Time' className="timeSelect" onChange={this.handleEndChange} value={this.state.endTime}/>
                  <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Confirm
                  </Button>
                </Modal.Content>
              </Modal>
            )}
          </Draggable>
      </Fragment>
    );
  }
}

export default Poi;
