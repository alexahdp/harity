import { takeEvery, put, call } from 'redux-saga/effects';
import ac, { actions } from '../actions/questions';
import api from '../api/questions';

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

  yield put(ac.clearEditQuestion());
}

function* updateQuestion({ payload }) {
  const { question } = payload;
  const savedQuestion = yield call(api.save, question);

  yield put(ac.updateQuestionSuccess(savedQuestion));

  yield put(ac.clearEditQuestion());
}

function* removeQuestion({ payload }) {
  yield call(api.remove, payload.questionId);

  yield put(ac.removeQuestionSuccess(payload.questionId));
}

function* mySaga() {
  yield takeEvery(actions.FETCH_QUESTIONS, fetchQuestions);
  yield takeEvery(actions.ADD_QUESTION, addQuestion);
  yield takeEvery(actions.UPDATE_QUESTION, updateQuestion);
  yield takeEvery(actions.REMOVE_QUESTION, removeQuestion);
}

export default mySaga;
