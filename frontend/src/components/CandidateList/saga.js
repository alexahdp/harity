import { takeEvery, put, call } from 'redux-saga/effects';
import ac, { actions } from './actions';
import api from '../Candidate/api';

export function* remove({ payload }) {
  yield call(api.remove, payload.candidateId);
  yield put(ac.removeSuccess(payload.candidateId));
}

export function* fetchList() {
  const candidates = yield call(api.fetchList);
  yield put(ac.fetchListSuccess(candidates));
}

function* mySaga() {
  yield takeEvery(actions.CANDIDATE_FETCH_LIST, fetchList);
  yield takeEvery(actions.CANDIDATE_REMOVE, remove);
}

export default mySaga;
