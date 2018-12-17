import React, { Component } from 'react';
import styled from 'styled-components';
import Poi from './poi';
import { Droppable } from 'react-beautiful-dnd';
import OverflowScrolling from 'react-overflow-scrolling';

const Container = styled.div`
  margin: 8px;
  border: 4px solid lightgrey;
  border-radius: 2px;
  width: 350px;
  height: 540px;
  background-color: white;

  display:flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0px;
  padding: 14px;
  border: 4px solid lightgrey;
  color: black;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color:${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 540px;
`;

class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <OverflowScrolling className='overflow-scrolling'>
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
        </OverflowScrolling>
      </Container>
    );
  }
}

export default Column;
