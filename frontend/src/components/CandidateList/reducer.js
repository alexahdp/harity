import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const initialState = {
  isShownFilterPanel: false,
  list: [],
  filters: {
    skills: [],
    sex: null,
  },
  availableSkills: [
    'nodejs', 'php', 'perl', 'c++', 'java',
    'mongodb', 'mysql',
  ],
};

export default handleActions(
  {
    [actions.CANDIDATE_FETCH_LIST_SUCCESS](state, action) {
      return state.set('list', fromJS(action.payload.candidates));
    },
    [actions.CANDIDATE_REMOVE_SUCCESS](state, action) {
      return state.update(
        'list',
        candidates => candidates.filter(candidate => candidate.get('_id') === action.payload.candidateId),
      );
    },

    [actions.CANDIDATE_LIST_SHOW_FILTER_PANEL](state) {
      return state.set('isShownFilterPanel', true);
    },
    [actions.CANDIDATE_LIST_HIDE_FILTER_PANEL](state) {
      return state.set('isShownFilterPanel', false);
    },

    [actions.SET_FILTER](state, action) {
      return state.setIn(
        ['filters', action.payload.key],
        action.payload.value,
      );
    },
  },
  Immutable.fromJS(initialState),
);
