import { createSelector } from 'reselect';

export const getCurrentInterviewQuestionsMap = state => {
  return state
    .getIn(['interviewPlan', 'interviewPlan', 'questions'])
    .reduce((o, question) => {
      o[question.get('_id')] = question;
      return o;
    }, {});
};
