import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

function getEmptyCandidate() {
  return {
    _id: null,
    birthYear: '',
    createdAt: null,
    description: '',
    email: '',
    sex: 'none',
    firstName: '',
    lastName: '',
    level: 'none',
    skills: [],
    contacts: {
      email: '',
      phone: '',
      skype: '',
    },
  };
}

const initialState = {
  currentCandidate: getEmptyCandidate(),
  errorAlertVisible: false,
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

    [actions.CANDIDATE_SAVE_SHOW_ERROR](state) {
      return state.set('errorAlertVisible', true);
    },
    [actions.CANDIDATE_SAVE_HIDE_ERROR](state) {
      return state.set('errorAlertVisible', false);
    },
  },
  Immutable.fromJS(initialState),
);
