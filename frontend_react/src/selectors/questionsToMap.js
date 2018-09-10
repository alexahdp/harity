import { createSelector } from 'reselect';

export const questionsToMap = createSelector(state => {
  return state
    .getIn(['interviewPlan', 'interviewPlan', 'questions'])
    .reduce((o, question) => {
      o[question.get('_id')] = question;
      return o;
    }, {});
});
