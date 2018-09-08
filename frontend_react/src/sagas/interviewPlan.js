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

function* getInterviewPlan({ payload }) {
  const interviewPlan = yield call(api.getInterviewPlan, payload.interviewPlanId);
  yield put(ac.setInterviewPlan(interviewPlan));

}

function* addQuestion({ payload }) {
  const state = yield select();
  const question = state.getIn(['questions', 'questionList']).find(q => {
    return q.get('_id') === payload.questionId;
  });

  yield put(ac.addQuestionToInterviewPlan(question));
}

function* mySaga() {
  yield takeEvery(actions.FETCH_INTERVIEWPLANS, fetch);
  yield takeEvery(actions.SAVE, save);
  yield takeEvery(actions.GET_INTERVIEW_PLAN, getInterviewPlan);
  yield takeEvery(actions.ADD_QUESTION, addQuestion);
}

export default mySaga;
