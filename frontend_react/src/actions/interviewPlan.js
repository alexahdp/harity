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
  GET_INTERVIEW_PLAN: ga('GET_INTERVIEW_PLAN'),
  SET_INTERVIEW_PLAN: ga('SET_INTERVIEW_PLAN'),
  ADD_QUESTION_TO_INTERVIEW_PLAN: ga('ADD_QUESTION_TO_INTERVIEW_PLAN'),
  REMOVE_INTERVIEW_PLAN: ga('REMOVE_INTERVIEW_PLAN'),
  REMOVE_INTERVIEW_PLAN_SUCCESS: ga('REMOVE_INTERVIEW_PLAN_SUCCESS'),
  RESET_CURRENT: ga('RESET_CURRENT'),
  CREATE_INTERVIEW_PLAN: ga('CREATE_INTERVIEW_PLAN'),
  MOVE_UP_QUESTION: ga('MOVE_UP_QUESTION'),
  MOVE_DOWN_QUESTION: ga('MOVE_DOWN_QUESTION'),
};

export default {
  addQuestion: createAction(actions.ADD_QUESTION, questionId => ({ questionId })),
  addQuestionToInterviewPlan: createAction(actions.ADD_QUESTION_TO_INTERVIEW_PLAN, question => ({ question })),
  removeQuestion: createAction(actions.REMOVE_QUESTION, questionId => ({ questionId })),
  openInterviewPlanDialog: createAction(actions.OPEN_INTERVIEWPLAN_DIALOG),
  closeInterviewPlanDialog: createAction(actions.CLOSE_INTERVIEWPLAN_DIALOG),
  fetchInterviewPlans: createAction(actions.FETCH_INTERVIEWPLANS),
  fetchInterviewPlansSuccess: createAction(actions.FETCH_INTERVIEWPLANS_SUCCESS, interviewPlans => ({ interviewPlans })),
  save: createAction(actions.SAVE, history => ({ history })),
  saveSuccess: createAction(actions.SAVE_SUCCESS, interviewPlan => ({ interviewPlan })),
  setTitle: createAction(actions.SET_TITLE, title => ({ title })),
  getInterviewPlan: createAction(actions.GET_INTERVIEW_PLAN, interviewPlanId => ({ interviewPlanId })),
  setInterviewPlan: createAction(actions.SET_INTERVIEW_PLAN, interviewPlan => ({ interviewPlan })),
  removeInterviewPlan: createAction(actions.REMOVE_INTERVIEW_PLAN, interviewPlanId => ({ interviewPlanId })),
  removeInterviewPlanSuccess: createAction(actions.REMOVE_INTERVIEW_PLAN_SUCCESS, interviewPlanId => ({ interviewPlanId })),
  resetCurrentInterviewPlan: createAction(actions.RESET_CURRENT),
  createNewInterviewPlan: createAction(actions.CREATE_INTERVIEW_PLAN, history => ({ history })),
  moveUpQuestion: createAction(actions.MOVE_UP_QUESTION, questionId => ({ questionId })),
  moveDownQuestion: createAction(actions.MOVE_DOWN_QUESTION, questionId => ({ questionId })),
};
