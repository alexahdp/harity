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
