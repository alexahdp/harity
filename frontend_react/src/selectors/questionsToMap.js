/* eslint-disable import/prefer-default-export */
export const getCurrentInterviewQuestionsMap = state => state
  .getIn(['interviewPlan', 'interviewPlan', 'questions'])
  .reduce((o, question) => {
    o[question.get('_id')] = question; // eslint-disable-line no-param-reassign
    return o;
  }, {});
