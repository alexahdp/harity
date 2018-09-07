import { combineReducers } from 'redux-immutable';
import questions from './questions';
import interviewPlan from './interviewPlan';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  questions,
  interviewPlan,
  routing: routerReducer,
});
