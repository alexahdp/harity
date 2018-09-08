import { connect } from 'react-redux';
import InterviewPlan from '../components/InterviewPlan/index';
import actions from '../actions/interviewPlan';
import questionsActions from '../actions/questions';

export default connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    interviewPlan: state.getIn(['interviewPlan', 'interviewPlan']),

  }),
  {
    openInterviewPlanDialog: actions.openInterviewPlanDialog,
    fetchQuestions: questionsActions.fetchQuestions,
    addQuestion: actions.addQuestion,
    removeQuestion: actions.removeQuestion,
    setTitle: actions.setTitle,
    save: actions.save,
    getInterviewPlan: actions.getInterviewPlan,
  },
)(InterviewPlan);
