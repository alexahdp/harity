import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const sexOptions = [
  { label: 'None', value: 'none' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const levelOptions = [
  { label: 'None', value: 'none' },
  { label: 'Junior', value: 'junior' },
  { label: 'Middle', value: 'middle' },
  { label: 'Senior', value: 'senior' },
  { label: 'Senior-Fullstak', value: 'seniorfullstack' },
  { label: 'TeamLead', value: 'teamlead' },
];

const skillsOptions = [
  { label: 'nodejs', value: 'nodejs' },
  { label: 'php', value: 'php' },
  { label: 'java', value: 'java' },
  { label: 'mysql', value: 'mysql' },
  { label: 'mongodb', value: 'mongodb' },
  { label: 'git', value: 'git' },
  { label: 'perl', value: 'perl' },
];

const initialState = {
  isShownFilterPanel: false,
  list: [],

  filterOptions: {
    sex: sexOptions,
    sexMap: sexOptions.reduce((o, option) => ({...o, [option.value]: option}), {}),
    level: levelOptions,
    levelMap: levelOptions.reduce((o, option) => ({...o, [option.value]: option}), {}),
    skills: skillsOptions,
  },

  filters: {
    level: levelOptions[0],
    skills: [],
    sex: sexOptions[0],
  },
};

export default handleActions(
  {
    [actions.CANDIDATE_FETCH_LIST_SUCCESS](state, action) {
      return state.set('list', fromJS(action.payload.candidates));
    },
    [actions.CANDIDATE_REMOVE_SUCCESS](state, action) {
      return state.update(
        'list',
        candidates => candidates.filter(candidate => {
          return candidate.get('_id') !== action.payload.candidateId;
        })
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
    [actions.RESET_FILTERS](state) {
      return state
        .setIn(['filters', 'skills'], Immutable.List([]))
        .setIn(['filters', 'level'], Immutable.Map(levelOptions[0]))
        .setIn(['filters', 'sex'], Immutable.Map(sexOptions[0]));
    },
  },
  Immutable.fromJS(initialState),
);
