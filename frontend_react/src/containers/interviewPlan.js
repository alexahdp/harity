import { connect } from 'react-redux';
import InterviewPlan from '../components/InterviewPlan/index';
import actions from '../actions/interviewPlan';
import questionsActions from '../actions/questions';
import { questionsToMap } from '../selectors/questionsToMap';

export default connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    interviewPlan: state.getIn(['interviewPlan', 'interviewPlan']),
    selectedQuestionsMap: state => questionsToMap(state),
  }),
  {
    ...actions,
    fetchQuestions: questionsActions.fetchQuestions,
  }
  // {
  //   openInterviewPlanDialog: actions.openInterviewPlanDialog,
  //   fetchQuestions: questionsActions.fetchQuestions,
  //   addQuestion: actions.addQuestion,
  //   removeQuestion: actions.removeQuestion,
  //   setTitle: actions.setTitle,
  //   save: actions.save,
  //   getInterviewPlan: actions.getInterviewPlan,
  //   moveUpQuestion: actions.moveUpQuestion,
  //   moveDownQuestion: actions.moveDownQuestion,
  // },
)(InterviewPlan);
