import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

function getEmptyCandidate() {
  return {
    _id: null,
    birthYear: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: null,
    description: '',
    level: 'none',
  };
}

const initialState = {
  currentCandidate: getEmptyCandidate(),
};

export default handleActions(
  {
    [actions.CANDIDATE_SET_PROP](state, action) {
      return state.setIn(
        ['currentCandidate', action.payload.property],
        action.payload.value,
      );
    },
    [actions.CANDIDATE_SAVE_SUCCESS](state, action) {
      return state.set('currentCandidate', Immutable.Map(action.payload.candidate));
    },
    [actions.CANDIDATE_FETCH_SUCCESS](state, action) {
      return state.set('currentCandidate', Immutable.Map(action.payload.candidate));
    },
    [actions.CANDIDATE_RESET_CURRENT](state) {
      return state.set('currentCandidate', fromJS(getEmptyCandidate()));
    },
  },
  Immutable.fromJS(initialState),
);
