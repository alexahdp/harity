import { fork } from 'redux-saga/effects';
import questionsSaga from '../components/Questions/saga';
import interviewPlansSaga from '../components/InterviewPlan/saga';
import candidateSaga from '../components/Candidate/saga';

function* mySaga() {
  yield fork(questionsSaga);
  yield fork(interviewPlansSaga);
  yield fork(candidateSaga);
}

export default mySaga;
