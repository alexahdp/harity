import { createAction } from 'redux-actions';
import ga from '../helpers/genAction';

export const actions = {
  OPEN_INTERVIEWPLAN_DIALOG: ga('OPEN_INTERVIEWPLAN_DIALOG'),
  CLOSE_INTERVIEWPLAN_DIALOG: ga('CLOSE_INTERVIEWPLAN_DIALOG'),
};

export default {
  openInterviewPlanDialog: createAction(actions.OPEN_INTERVIEWPLAN_DIALOG),
  closeInterviewPlanDialog: createAction(actions.CLOSE_INTERVIEWPLAN_DIALOG),
};
