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
  isShownFilterPanel: false,
  list: [],
};

export default handleActions(
  {
    [actions.CANDIDATE_SET_PROP](state, action) {
      return state.setIn(
        ['currentCandidate', action.payload.property],
        action.payload.value,
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
    [actions.CANDIDATE_REMOVE_SUCCESS](state, action) {
      return state.update(
        'list',
        candidates => candidates.filter(candidate => candidate.get('_id') === action.payload.candidateId),
      );
    },
    [actions.CANDIDATE_RESET_CURRENT](state) {
      return state.set('currentCandidate', fromJS(getEmptyCandidate()));
    },

    [actions.CANDIDATE_LIST_SHOW_FILTER_PANEL](state) {
      return state.set('isShownFilterPanel', true);
    },
    [actions.CANDIDATE_LIST_HIDE_FILTER_PANEL](state) {
      return state.set('isShownFilterPanel', false);
    },
  },
  Immutable.fromJS(initialState),
);
