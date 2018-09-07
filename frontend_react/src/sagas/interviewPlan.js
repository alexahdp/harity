import { takeEvery, put, call, select } from 'redux-saga/effects';
import ac, { actions } from '../actions/interviewPlan';
import api from '../api/interviewPlan';

function* fetch() {
  const interviewPlans = yield call(api.fetch);
  yield put(ac.fetchInterviewPlansSuccess(interviewPlans));
}

function* save() {
  const state = yield select();
  const interviewPlan = state.getIn(['interviewPlan', 'interviewPlan']);

  const savedInterviewPlan = yield call(api.save, interviewPlan.toJS());

  yield put(ac.saveSuccess(savedInterviewPlan));
}

function* mySaga() {
  yield takeEvery(actions.FETCH_INTERVIEWPLANS, fetch);
  yield takeEvery(actions.SAVE, save);
}

export default mySaga;
