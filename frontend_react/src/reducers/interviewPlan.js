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
  interviewPlanDialogIsOpened: false,
  list: [{
    _id: 'dcsf3',
    title: 'Test plan',
    createdAt: '2018-09-01',
  }],
}));

export default interviewPlan;
