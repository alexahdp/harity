import { takeEvery, put, call, select } from 'redux-saga/effects';
import ac, { actions } from './actions';
import api from './api';

function* save({ payload }) {
  const state = yield select();
  const currentCandidate = state.getIn(['candidates', 'currentCandidate']).toJS();
  const savedCandidate = yield call(api.save, currentCandidate);
  yield put(ac.saveSuccess(savedCandidate));
}

function* remove({ payload }) {
  yield call(api.remove, payload.candidateId);
  yield put(ac.removeSuccess(payload.candidateId));
}

function* fetchList() {
  const candidates = yield call(api.fetchList);
  yield put(ac.fetchListSuccess(candidates));
}

function* mySaga() {
  yield takeEvery(actions.CANDIDATE_SAVE, save);
  yield takeEvery(actions.CANDIDATE_REMOVE, remove);
  yield takeEvery(actions.CANDIDATE_FETCH_LIST, fetchList);
}

export default mySaga;
