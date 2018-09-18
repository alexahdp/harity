import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const initialState = {
  currentCandidate: {
    _id: null,
    birthYear: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: null,
    description: '',
    level: 'none',
  },
  list: [],
};

const candidate = handleActions(
  {
    [actions.CANDIDATE_SET_PROP](state, action) {
      return state.setIn(
        ['currentCandidate', action.payload.property],
        action.payload.value
      );
    },
    [actions.CANDIDATE_FETCH_LIST_SUCCESS](state, action) {
      return state.set('list', fromJS(action.payload.candidates));
    },
    [actions.CANDIDATE_SAVE_SUCCESS](state, action) {
      return state.set('currentCandidate', Immutable.Map(action.payload.candidate));
    },
    [actions.CANDIDATE_FETCH_SUCCESS](state, action) {
      return state.set('currentCandidate', Immutable.Map(action.payload.candidate));
    },
  },
  Immutable.fromJS(initialState)
);

export default candidate;
