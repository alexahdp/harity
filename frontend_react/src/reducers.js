// import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions/questions';

const questions = handleActions({
  [actions.QUESTIONS_FETCHED](state, action) {
    return state.set('questionList', action.payload.questions);
  },
  [actions.ADD_QUESTION_SUCCESS](state, action) {
    const res = state.set(
      'questionList',
      state.get('questionList').concat(action.payload.question)
    );

    return res;
  },
},
Immutable.fromJS({
  questionList: [],
}),
);

export default combineReducers({
  app: state => state || { name: 'Alex' },
  questions
});
