import { createAction } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  ADD_QUESTION: ga('ADD_QUESTION'),
  ADD_QUESTION_SUCCESS: ga('ADD_QUESTION_SUCCESS'),
  CLEAR_EDIT_QUESTION: ga('CLEAR_EDIT_QUESTION'),
  FETCH_QUESTIONS: ga('FETCH_QUESTIONS'),
  QUESTIONS_FETCHED: ga('QUESTIONS_FETCHED'),
  REMOVE_QUESTION: ga('REMOVE_QUESTION'),
  SAVE_QUESTION: ga('SAVE_QUESTION'),
  REMOVE_QUESTION_SUCCESS: ga('REMOVE_QUESTION_SUCCESS'),
  SET_EDIT_QUESTION: ga('SET_EDIT_QUESTION'),
  UPDATE_QUESTION: ga('UPDATE_QUESTION'),
  UPDATE_QUESTION_SUCCESS: ga('UPDATE_QUESTION_SUCCESS'),
};

export default {
  addQuestion: createAction(
    actions.ADD_QUESTION,
    question => ({ question }),
  ),
  addQuestionSuccess: createAction(
    actions.ADD_QUESTION_SUCCESS,
    question => ({ question }),
  ),
  clearEditQuestion: createAction(actions.CLEAR_EDIT_QUESTION),
  editQuestion: createAction(
    actions.SET_EDIT_QUESTION,
    questionId => ({ questionId }),
  ),
  fetchQuestions: createAction(actions.FETCH_QUESTIONS),
  removeQuestion: createAction(
    actions.REMOVE_QUESTION,
    questionId => ({ questionId }),
  ),
  removeQuestionSuccess: createAction(
    actions.REMOVE_QUESTION_SUCCESS,
    questionId => ({ questionId }),
  ),
  updateQuestion: createAction(
    actions.UPDATE_QUESTION,
    question => ({ question }),
  ),
  updateQuestionSuccess: createAction(
    actions.UPDATE_QUESTION_SUCCESS,
    question => ({ question }),
  ),
};
