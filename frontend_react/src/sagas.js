import { takeEvery, fork, put, call } from 'redux-saga/effects';
import ac, { actions } from './actions/questions';
import api from './api/questions';

function* fetchQuestions() {
  const questions = yield call(api.fetch);

  yield put({
    type: actions.QUESTIONS_FETCHED,
    payload: { questions },
  });
}

function* addQuestion({ payload }) {
  const { question } = payload;
  const savedQuestion = yield call(api.save, question);

  yield put(ac.addQuestionSuccess(savedQuestion));
}

function* mySaga() {
  yield takeEvery(actions.FETCH_QUESTIONS, fetchQuestions);
  yield takeEvery(actions.ADD_QUESTION, addQuestion);
}

export default mySaga;
