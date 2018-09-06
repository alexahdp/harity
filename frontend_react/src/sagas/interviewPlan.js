import { takeEvery, put, call } from 'redux-saga/effects';
import ac, { actions } from '../actions/interviewPlan';
import api from '../api/questions';

function* fetch() {
  const interviewPlans = [
    {
      _id: 'dcsf3',
      title: 'Test plan',
      createdAt: '2018-09-01',
    }
  ];
  yield put(ac.fetchInterviewPlansSuccess(interviewPlans));
}

function* mySaga() {
  yield takeEvery(actions.FETCH_INTERVIEWPLANS, fetch);
}

export default mySaga;
