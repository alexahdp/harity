import { connect } from 'react-redux';
import Questions from '../components/Questions';
import actions from '../actions/questions';

export default connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    editQuestion: state.getIn(['questions', 'editQuestion']),
  }),
  {
    fetchQuestions: actions.fetchQuestions,
    addQuestion: actions.addQuestion,
    updateQuestion: actions.updateQuestion,
    setEditQuestion: actions.editQuestion,
    removeQuestion: actions.removeQuestion,
  },
)(Questions);
