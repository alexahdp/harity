import { connect } from 'react-redux';
import InterviewPlan from '../components/InterviewPlan/index';
import actions from '../actions/interviewPlan';
import { getCurrentInterviewQuestionsMap } from '../selectors/questionsToMap';

export default connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    interviewPlan: state.getIn(['interviewPlan', 'interviewPlan']),
    selectedQuestionsMap: state => getCurrentInterviewQuestionsMap(state),
  }),
  {
    setTitle: actions.setTitle,
    save: actions.save,
    getInterviewPlan: actions.getInterviewPlan,
    moveUpQuestion: actions.moveUpQuestion,
    moveDownQuestion: actions.moveDownQuestion,
    removeQuestion: actions.removeQuestion,
  }
)(InterviewPlan);
