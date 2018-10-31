const initialData = {
  tasks: {
    'task-1' : {id: 'task-1', name:'Times Square'},
    'task-2' : {id: 'task-2', name:'Empire State Building'},
    'task-3' : {id: 'task-3', name:'National September 11 Memorial & Museum'},
    'task-4' : {id: 'task-4', name:'Rockefeller Center'},
    'task-5' : {id: 'task-5', name:'Statue of Liberty'},
    'task-6' : {id: 'task-6', name:'Grand Central Terminal'},
    'task-7' : {id: 'task-7', name:'5th Avenue'},
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
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4','task-5', 'task-6', 'task-7']
    },
  },
  columnOrder: ['column-1', 'column-2']
};

export default initialData;
