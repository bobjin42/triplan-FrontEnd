import React, { Component } from 'react';
import Column from './column';
import Calender from './calender'
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { schedualedPlace } from '../store/actions'


const Container = styled.div`
  display: flex
`;

class SelectedPOIs extends Component {

  componentDidMount() {
    const selectedArrar = this.props.selectedPlaces.map(place => {
      return {id: place.api_id, name: place.name}
    })
    const arrayToObject = (array) =>
      array.reduce((obj, item) => {
        obj[item.id] = item
      return obj
      }, {})
    const changedObj = arrayToObject(selectedArrar)
    const ids = Object.keys(changedObj)
    this.setState({
      tasks: changedObj,
      columns: {
        ...this.state.columns,
        ["column-2"]: {
          ...this.state.columns["column-2"],
          taskIds: ids
        }
      }
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      tasks: {

      },
      columns: {
        'column-1': {
          id:'column-1',
          title: 'Day 1',
          taskIds: [],
        },
        'column-2': {
          id:'column-2',
          title: 'Selected POIs',
          taskIds: []
        },
      },
      columnOrder: ['column-1', 'column-2']
    };
  }

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
        this.setState(newState, () => {
          this.props.dispatch(schedualedPlace(this.state.columns['column-1'].taskIds))
        });
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
      this.setState(newState, () => {
        this.props.dispatch(schedualedPlace(this.state.columns['column-1'].taskIds))
      })

    };

  render() {
    const column = this.state.columns['column-2'];
    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
    console.log(this.state);
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
    selectedPlaces: state.selectedPlaces
  }
}


export default connect(mapStateToProps)(SelectedPOIs);
