import { createAction } from 'redux-actions';
import ga from '../helpers/genAction';

export const actions = {
  OPEN_INTERVIEWPLAN_DIALOG: ga('OPEN_INTERVIEWPLAN_DIALOG'),
  CLOSE_INTERVIEWPLAN_DIALOG: ga('CLOSE_INTERVIEWPLAN_DIALOG'),
  FETCH_INTERVIEWPLANS: ga('FETCH_INTERVIEWPLANS'),
  FETCH_INTERVIEWPLANS_SUCCESS: ga('FETCH_INTERVIEWPLANS_SUCCESS'),
};

export default {
  openInterviewPlanDialog: createAction(actions.OPEN_INTERVIEWPLAN_DIALOG),
  closeInterviewPlanDialog: createAction(actions.CLOSE_INTERVIEWPLAN_DIALOG),
  fetchInterviewPlans: createAction(actions.FETCH_INTERVIEWPLANS),
  fetchInterviewPlansSuccess: createAction(actions.FETCH_INTERVIEWPLANS_SUCCESS, interviewPlans => ({ interviewPlans })),
};
