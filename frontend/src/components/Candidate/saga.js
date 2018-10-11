import { takeEvery, put, call } from 'redux-saga/effects';
import ac, { actions } from './actions';
import history from '../../history';
import api from './api';

function* save({ payload }) {
  try {
    const savedCandidate = yield call(api.save, payload.candidate);
    yield put(ac.saveSuccess(savedCandidate));
    history.replace(`/candidate/${savedCandidate._id}`);
  } catch (err) {
    console.log('Error', err); // eslint-disable-line no-console
  }
}

function* fetch({ payload }) {
  const candidate = yield call(api.fetch, payload.candidateId);
  yield put(ac.fetchSuccess(candidate));
}

function* mySaga() {
  yield takeEvery(actions.CANDIDATE_SAVE, save);
  yield takeEvery(actions.CANDIDATE_FETCH, fetch);
}

export default mySaga;
