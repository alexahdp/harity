import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const interviewPlan = handleActions({
  [actions.ADD_QUESTION_TO_INTERVIEW_PLAN](state, action) {
    return state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.push(action.payload.question),
    );
  },

  [actions.REMOVE_QUESTION](state, action) {
    return state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.filter(question => question.get('_id') !== action.payload.questionId),
    );
  },

  [actions.SET_TITLE](state, action) {
    return state.setIn(['interviewPlan', 'title'], action.payload.title);
  },

  [actions.SAVE_SUCCESS](state, action) {
    const interviewPlanObj = Immutable.fromJS(action.payload.interviewPlan);

    let newState = state;
    if (!state.getIn(['interviewPlan', '_id'])) {
      newState = newState.update('list', interviewPlans => interviewPlans.push(interviewPlanObj));
    }

    newState = newState.setIn(['interviewPlan'], interviewPlanObj);
    return newState;
  },

  [actions.FETCH_INTERVIEWPLANS_SUCCESS](state, action) {
    return state.set('list', Immutable.fromJS(action.payload.interviewPlans));
  },

  [actions.SET_INTERVIEW_PLAN](state, action) {
    return state.set('interviewPlan', Immutable.fromJS(action.payload.interviewPlan));
  },

  [actions.REMOVE_INTERVIEW_PLAN_SUCCESS](state, action) {
    return state.update('list', list => list.filter(ip => ip.get('_id') !== action.payload.interviewPlanId));
  },

  [actions.RESET_CURRENT](state) {
    return state.set('interviewPlan', Immutable.fromJS({
      createdAt: '',
      description: '',
      level: 0,
      questions: [],
      title: '',
    }));
  },

  [actions.MOVE_UP_QUESTION](state, action) {
    const index = state.getIn(['interviewPlan', 'questions']).findIndex(question => question.get('_id') === action.payload.questionId);

    if (index === 0) return state;

    const question = state.getIn(['interviewPlan', 'questions', index]);

    const newState = state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.splice(index, 1),
    );

    return newState.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.splice(index - 1, 0, question),
    );
  },

  [actions.MOVE_DOWN_QUESTION](state, action) {
    const index = state.getIn(['interviewPlan', 'questions']).findIndex(question => question.get('_id') === action.payload.questionId);

    if (index === state.getIn(['interviewPlan', 'questions']).size) return state;

    const question = state.getIn(['interviewPlan', 'questions', index]);

    const newState = state.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.splice(index, 1),
    );

    return newState.updateIn(
      ['interviewPlan', 'questions'],
      questions => questions.splice(index + 1, 0, question),
    );
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
  list: [],
}));

export default interviewPlan;
