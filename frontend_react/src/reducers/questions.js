import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from '../actions/questions';

const questions = handleActions({
  [actions.QUESTIONS_FETCHED](state, action) {
    return state.set('questionList', Immutable.fromJS(action.payload.questions));
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
    let newState = state.update('questionList', list => list.map(question => {
      return question.get('_id') === action.payload.question._id ? action.payload.question : question;
    }));

    if (newState.getIn(['editQuestion', '_id']) === action.payload.question._id) {
      newState = newState.set('editQuestion', Immutable.fromJS(action.payload.question));
    }

    return newState;
  },

  [actions.CLEAR_EDIT_QUESTION](state) {
    return state.set('editQuestion', Immutable.fromJS({
      text: '',
      labels: [],
      _id: null,
    }));
  },

  [actions.REMOVE_QUESTION_SUCCESS](state, action) {
    return state.update('questionList', questionList => {
      return questionList.filter(q => q.get('_id') !== action.payload.questionId);
    });
  },
},
Immutable.fromJS({
  questionList: [],
  editQuestion: {
    text: '',
    labels: [],
    _id: null,
  },
}),
);

export default questions;
