import { combineReducers } from 'redux-immutable';
import questions from './questions';
import interviewPlan from './interviewPlan';

export default combineReducers({
  questions,
  interviewPlan,
});
