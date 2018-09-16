import { combineReducers } from 'redux-immutable';
import questions from './questions';
import interviewPlan from './interviewPlan';
import candidates from '../components/Candidate/reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  candidates,
  questions,
  interviewPlan,
  routing: routerReducer,
});
