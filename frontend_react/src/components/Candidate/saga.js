import { takeEvery, put, call, select } from 'redux-saga/effects';
import ac, { actions } from './actions';
import history from '../../history';
import api from './api';

function* save({ payload }) {
  try {
    const savedCandidate = yield call(api.save, payload.candidate);
    yield put(ac.saveSuccess(savedCandidate));
    history.replace(`/candidate/${savedCandidate._id}`);
  } catch(err) {
    console.log('Error', err);
  }
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
