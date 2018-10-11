import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import questions from './components/Questions/reducer';
import interviewPlan from './components/InterviewPlan/reducer';
import candidate from './components/Candidate/reducer';
import candidates from './components/CandidateList/reducer';

export default combineReducers({
  candidate,
  candidates,
  questions,
  interviewPlan,
  routing: routerReducer,
});
