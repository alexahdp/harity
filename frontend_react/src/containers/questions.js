import { connect } from 'react-redux';
import Questions from '../components/Questions';
import actions from '../actions/questions';

export default connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
  }),
  {
    fetchQuestions: actions.fetchQuestions,
    addQuestion: actions.addQuestion,
  },
)(Questions);
