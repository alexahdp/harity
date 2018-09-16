import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const initialState = {
  currentCandidate: {
    _id: null,
    email: '',
    firstName: '',
    birthYear: '',
    lastName: '',
    createdAt: '',
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
  },
  Immutable.fromJS(initialState)
);

export default candidate;
