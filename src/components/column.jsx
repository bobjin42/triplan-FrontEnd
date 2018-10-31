import React, { Component } from 'react';
import styled from 'styled-components';
import Poi from './poi';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 250px;

  display:flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  color: red;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color:${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
          {this.props.tasks.map((task, index) => <Poi key={task.id} task={task} index={index}/>)}
          {provided.placeholder}
          </TaskList>
        )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
