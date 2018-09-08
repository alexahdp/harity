import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from '../actions/interviewPlan';

const interviewPlan = handleActions({
  [actions.OPEN_INTERVIEWPLAN_DIALOG](state) {
    return state.set('interviewPlanDialogIsOpened', true);
  },
  [actions.CLOSE_INTERVIEWPLAN_DIALOG](state) {
    return state.set('interviewPlanDialogIsOpened', false);
  },
  [actions.ADD_QUESTION_TO_INTERVIEW_PLAN](state, action) {
    return state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.push(action.payload.question)
    );
  },
  [actions.REMOVE_QUESTION](state, action) {
    return state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.filter(question => question.get('_id') !== action.payload.questionId)
    );
  },
  [actions.SET_TITLE](state, action) {
    return state.setIn(['interviewPlan', 'title'], action.payload.title);
  },
  [actions.SAVE_SUCCESS](state, action) {
    const interviewPlan = Immutable.fromJS(action.payload.interviewPlan);

    let newState = state;
    if ( ! state.getIn(['interviewPlan', '_id'])) {
      newState = newState.update('list', interviewPlans => interviewPlans.push(interviewPlan));
    }

    newState = newState.setIn(['interviewPlan'], interviewPlan);
    return newState;
  },
  [actions.FETCH_INTERVIEWPLANS_SUCCESS](state, action) {
    return state.set('list', Immutable.fromJS(action.payload.interviewPlans));
  },
  [actions.SET_INTERVIEW_PLAN](state, action) {
    return state.set('interviewPlan', Immutable.fromJS(action.payload.interviewPlan));
  },
},
Immutable.fromJS({
  interviewPlan: {
    createdAt: '',
    description: '',
    level: 0,
    questions: [],
    title: '',
  },
  interviewPlanDialogIsOpened: false,
  list: [],
}));

export default interviewPlan;
