import { combineReducers } from 'redux-immutable';
import questions from '../components/Questions/reducer';
import interviewPlan from '../components/InterviewPlan/reducer';
import candidates from '../components/Candidate/reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  candidates,
  questions,
  interviewPlan,
  routing: routerReducer,
});
