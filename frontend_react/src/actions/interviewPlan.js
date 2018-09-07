import { createAction } from 'redux-actions';
import ga from '../helpers/genAction';

export const actions = {
  ADD_QUESTION: ga('ADD_QUESTION'),
  OPEN_INTERVIEWPLAN_DIALOG: ga('OPEN_INTERVIEWPLAN_DIALOG'),
  CLOSE_INTERVIEWPLAN_DIALOG: ga('CLOSE_INTERVIEWPLAN_DIALOG'),
  FETCH_INTERVIEWPLANS: ga('FETCH_INTERVIEWPLANS'),
  FETCH_INTERVIEWPLANS_SUCCESS: ga('FETCH_INTERVIEWPLANS_SUCCESS'),
  REMOVE_QUESTION: ga('REMOVE_QUESTION'),
  SET_TITLE: ga('SET_TITLE'),
  SAVE: ga('SAVE'),
  SAVE_SUCCESS: ga('SAVE_SUCCESS'),
};

export default {
  addQuestion: createAction(actions.ADD_QUESTION, questionId => ({ questionId })),
  removeQuestion: createAction(actions.REMOVE_QUESTION, questionId => ({ questionId })),
  openInterviewPlanDialog: createAction(actions.OPEN_INTERVIEWPLAN_DIALOG),
  closeInterviewPlanDialog: createAction(actions.CLOSE_INTERVIEWPLAN_DIALOG),
  fetchInterviewPlans: createAction(actions.FETCH_INTERVIEWPLANS),
  fetchInterviewPlansSuccess: createAction(actions.FETCH_INTERVIEWPLANS_SUCCESS, interviewPlans => ({ interviewPlans })),
  save: createAction(actions.SAVE),
  saveSuccess: createAction(actions.SAVE_SUCCESS, interviewPlan => ({ interviewPlan })),
  setTitle: createAction(actions.SET_TITLE, title => ({ title })),
};
