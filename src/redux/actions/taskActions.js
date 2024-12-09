export const ADD_TASK = 'ADD_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const moveTask = (taskId, newStatus) => ({
  type: MOVE_TASK,
  payload: { taskId, newStatus },
});

export const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  payload: tasks,
});
