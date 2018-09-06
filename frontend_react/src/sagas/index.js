import { fork } from 'redux-saga/effects';
import questionsSaga from './questions';
import interviewPlansSaga from './interviewPlan';

function* mySaga() {
  yield fork(questionsSaga);
  yield fork(interviewPlansSaga);
}

export default mySaga;
