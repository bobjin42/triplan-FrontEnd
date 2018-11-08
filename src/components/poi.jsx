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

  render() {
    return (
      <Fragment>
          <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
                  <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={this.handleOpen}
                    isDragging={snapshot.isDragging}>
                    {this.props.task.name}
                  </Container>
            )}
          </Draggable>
      </Fragment>
    );
  }
}

export default Poi;
