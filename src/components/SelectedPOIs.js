import React, { Component } from 'react';
import initialData from './initialData';
import Column from './column';
import Calender from './calender'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex
`;

class SelectedPOIs extends Component {

  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index,1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]:newColumn,
        }
      }
        this.setState(newState);
        return;
      };

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]:newStart,
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState)
    };

  render() {
    console.log(this.props.SelectedPlaces);
    const column = this.state.columns['column-2'];
    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
    const calender = this.state.columns['column-1']
    const schedual = calender.taskIds.map(taskId => this.state.tasks[taskId])
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <Calender key={calender.id} calender={calender} schedual={schedual}/>
            <Column key={column.id} column={column} tasks={tasks}/>
          </Container>
        </DragDropContext>
    );
  }
}

function mapStateToProps(state) {
  return {
    SelectedPlaces: state.SelectedPlaces
  }
}

export default connect(mapStateToProps, null)(SelectedPOIs);
