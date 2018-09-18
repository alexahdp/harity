import { createAction as ca } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  CANDIDATE_FETCH: ga('CANDIDATE_FETCH'),
  CANDIDATE_FETCH_SUCCESS: ga('CANDIDATE_FETCH_SUCCESS'),

  CANDIDATE_FETCH_LIST: ga('CANDIDATE_FETCH_LIST'),
  CANDIDATE_FETCH_LIST_SUCCESS: ga('CANDIDATE_FETCH_LIST_SUCCESS'),

  CANDIDATE_REMOVE: ga('CANDIDATE_REMOVE'),

  CANDIDATE_RESET_CURRENT: ga('CANDIDATE_RESET_CURRENT'),

  CANDIDATE_SAVE: ga('CANDIDATE_SAVE'),
  CANDIDATE_SAVE_SUCCESS: ga('CANDIDATE_SAVE_SUCCESS'),

  CANDIDATE_SET_PROP: ga('CANDIDATE_SET_PROP'),
};

export default {
  fetch: ca(actions.CANDIDATE_FETCH, candidateId => ({ candidateId })),
  fetchSuccess: ca(actions.CANDIDATE_FETCH_SUCCESS, candidate => ({ candidate })),

  fetchList: ca(actions.CANDIDATE_FETCH_LIST),
  fetchListSuccess: ca(actions.CANDIDATE_FETCH_LIST_SUCCESS, candidates => ({ candidates })),

  remove: ca(actions.CANDIDATE_REMOVE),

  resetCurrent: ca(actions.CANDIDATE_RESET_CURRENT),

  save: ca(actions.CANDIDATE_SAVE, candidate => ({ candidate })),
  saveSuccess: ca(actions.CANDIDATE_SAVE_SUCCESS, candidate => ({ candidate })),

  setProperty: ca(actions.CANDIDATE_SET_PROP, (property, value) => ({ property, value })),
};
