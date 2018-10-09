import {
  takeEvery, put, call, select,
} from 'redux-saga/effects';
import ac, { actions } from './actions';
import api from './api';

function* fetch() {
  const interviewPlans = yield call(api.fetch);
  yield put(ac.fetchInterviewPlansSuccess(interviewPlans));
}

function* save({ payload }) {
  const state = yield select();
  const interviewPlan = state.getIn(['interviewPlan', 'interviewPlan']);

  const savedInterviewPlan = yield call(api.save, interviewPlan.toJS());

  yield put(ac.saveSuccess(savedInterviewPlan));
  payload.history.replace(`/interviewPlan/${savedInterviewPlan._id}`);
}

function* getInterviewPlan({ payload }) {
  const interviewPlan = yield call(api.getInterviewPlan, payload.interviewPlanId);
  yield put(ac.setInterviewPlan(interviewPlan));
}

function* addQuestion({ payload }) {
  const state = yield select();
  const question = state.getIn(['questions', 'questionList']).find(q => q.get('_id') === payload.questionId);

  yield put(ac.addQuestionToInterviewPlan(question));
}

function* removeInterviewPlan({ payload }) {
  yield call(api.removeInterviewPlan, payload.interviewPlanId);
  yield put(ac.removeInterviewPlanSuccess(payload.interviewPlanId));
}

function* createNewInterviewPlan({ payload }) {
  yield put(ac.resetCurrentInterviewPlan());
  payload.history.push('/interviewPlan');
}

function* mySaga() {
  yield takeEvery(actions.FETCH_INTERVIEWPLANS, fetch);
  yield takeEvery(actions.SAVE, save);
  yield takeEvery(actions.GET_INTERVIEW_PLAN, getInterviewPlan);
  yield takeEvery(actions.ADD_QUESTION, addQuestion);
  yield takeEvery(actions.REMOVE_INTERVIEW_PLAN, removeInterviewPlan);
  yield takeEvery(actions.CREATE_INTERVIEW_PLAN, createNewInterviewPlan);
}

export default mySaga;
