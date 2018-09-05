import { createAction } from 'redux-actions';
import ga from '../helpers/genAction';

export const actions = {
  FETCH_QUESTIONS: ga('FETCH_QUESTIONS'),
  ADD_QUESTION: ga('ADD_QUESTION'),
  ADD_QUESTION_SUCCESS: ga('ADD_QUESTION_SUCCESS'),
  SAVE_QUESTION: ga('SAVE_QUESTION'),
  QUESTIONS_FETCHED: ga('QUESTIONS_FETCHED'),
};

export default {
  fetchQuestions: createAction(actions.FETCH_QUESTIONS),
  addQuestion: createAction(actions.ADD_QUESTION, question => ({ question })),
  addQuestionSuccess: createAction(actions.ADD_QUESTION_SUCCESS, question => ({ question })),
};
