import { createAction as ca } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  SET_FILTER: ga('SET_FILTER'),

  CANDIDATE_FETCH_LIST: ga('CANDIDATE_FETCH_LIST'),
  CANDIDATE_FETCH_LIST_SUCCESS: ga('CANDIDATE_FETCH_LIST_SUCCESS'),

  CANDIDATE_LIST_SHOW_FILTER_PANEL: ga('CANDIDATE_LIST_SHOW_FILTER_PANEL'),
  CANDIDATE_LIST_HIDE_FILTER_PANEL: ga('CANDIDATE_LIST_HIDE_FILTER_PANEL'),

  CANDIDATE_REMOVE: ga('CANDIDATE_REMOVE'),
  CANDIDATE_REMOVE_SUCCESS: ga('CANDIDATE_REMOVE_SUCCESS'),

  CANDIDATE_RESET_CURRENT: ga('CANDIDATE_RESET_CURRENT'),
};

export default {
  setFilter: ca(actions.SET_FILTER, (key, value) => ({ key, value })),

  fetchList: ca(actions.CANDIDATE_FETCH_LIST),
  fetchListSuccess: ca(actions.CANDIDATE_FETCH_LIST_SUCCESS, candidates => ({ candidates })),

  showFilterPanel: ca(actions.CANDIDATE_LIST_SHOW_FILTER_PANEL),
  hideFilterPanel: ca(actions.CANDIDATE_LIST_HIDE_FILTER_PANEL),

  remove: ca(actions.CANDIDATE_REMOVE, candidateId => ({ candidateId })),
  removeSuccess: ca(actions.CANDIDATE_REMOVE_SUCCESS, candidateId => ({ candidateId })),

  resetCurrent: ca(actions.CANDIDATE_RESET_CURRENT),
};
