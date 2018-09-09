import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from '../actions/questions';

const questions = handleActions({
  [actions.QUESTIONS_FETCHED](state, action) {
    return state
      .set('questionList', Immutable.fromJS(action.payload.questions))
      .set('questionFetched', true);
  },

  [actions.ADD_QUESTION_SUCCESS](state, action) {
    return state.update(
      'questionList',
      questionList => questionList.push(Immutable.fromJS(action.payload.question))
    );
  },

  [actions.SET_EDIT_QUESTION](state, action) {
    const question = state.get('questionList').find(q => q.get('_id') === action.payload.questionId);
    return state.set('editQuestion', question);
  },

  [actions.UPDATE_QUESTION_SUCCESS](state, action) {
    const updatedQuestion = Immutable.fromJS(action.payload.question);
    let newState = state.update('questionList', list => list.map(question => {
      return question.get('_id') === updatedQuestion.get('_id') ? updatedQuestion : question;
    }));

    if (newState.getIn(['editQuestion', '_id']) === action.payload.question._id) {
      newState = newState.set('editQuestion', updatedQuestion);
    }

    return newState;
  },

  [actions.CLEAR_EDIT_QUESTION](state) {
    return state.set('editQuestion', Immutable.fromJS({
      _id: null,
      complexity: '',
      labels: [],
      text: '',
    }));
  },

  [actions.REMOVE_QUESTION_SUCCESS](state, action) {
    return state.update('questionList', questionList => {
      return questionList.filter(q => q.get('_id') !== action.payload.questionId);
    });
  },
},
Immutable.fromJS({
  questionFetched: false,
  questionList: [],
  editQuestion: {
    _id: null,
    complexity: 1,
    labels: [],
    text: '',
  },
}),
);

export default questions;
