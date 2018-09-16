import { createAction } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  FETCH_QUESTIONS: ga('FETCH_QUESTIONS'),
  ADD_QUESTION: ga('ADD_QUESTION'),
  ADD_QUESTION_SUCCESS: ga('ADD_QUESTION_SUCCESS'),
  SAVE_QUESTION: ga('SAVE_QUESTION'),
  QUESTIONS_FETCHED: ga('QUESTIONS_FETCHED'),
  SET_EDIT_QUESTION: ga('SET_EDIT_QUESTION'),
  REMOVE_QUESTION: ga('REMOVE_QUESTION'),
  UPDATE_QUESTION: ga('UPDATE_QUESTION'),
  UPDATE_QUESTION_SUCCESS: ga('UPDATE_QUESTION_SUCCESS'),
  CLEAR_EDIT_QUESTION: ga('CLEAR_EDIT_QUESTION'),
  REMOVE_QUESTION_SUCCESS: ga('REMOVE_QUESTION_SUCCESS'),
};

export default {
  fetchQuestions: createAction(actions.FETCH_QUESTIONS),
  addQuestion: createAction(actions.ADD_QUESTION, question => ({ question })),
  updateQuestion: createAction(actions.UPDATE_QUESTION, question => ({ question })),
  addQuestionSuccess: createAction(actions.ADD_QUESTION_SUCCESS, question => ({ question })),
  updateQuestionSuccess: createAction(actions.UPDATE_QUESTION_SUCCESS, question => ({ question })),
  editQuestion: createAction(actions.SET_EDIT_QUESTION, questionId => ({questionId})),
  removeQuestion: createAction(actions.REMOVE_QUESTION, questionId => ({questionId})),
  clearEditQuestion: createAction(actions.CLEAR_EDIT_QUESTION),
  removeQuestionSuccess: createAction(actions.REMOVE_QUESTION_SUCCESS, questionId => ({ questionId })),
};
