import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  taskState: taskReducer,
});

export default rootReducer;
