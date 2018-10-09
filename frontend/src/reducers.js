import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import questions from './components/Questions/reducer';
import interviewPlan from './components/InterviewPlan/reducer';
import candidates from './components/Candidate/reducer';

export default combineReducers({
  candidates,
  questions,
  interviewPlan,
  routing: routerReducer,
});
