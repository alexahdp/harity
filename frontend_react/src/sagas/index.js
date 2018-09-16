import { fork } from 'redux-saga/effects';
import questionsSaga from './questions';
import interviewPlansSaga from './interviewPlan';
import candidateSaga from '../components/Candidate/saga';

function* mySaga() {
  yield fork(questionsSaga);
  yield fork(interviewPlansSaga);
  yield fork(candidateSaga);
}

export default mySaga;
