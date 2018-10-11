import { createAction as ca } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  CANDIDATE_FETCH: ga('CANDIDATE_FETCH'),
  CANDIDATE_FETCH_SUCCESS: ga('CANDIDATE_FETCH_SUCCESS'),

  CANDIDATE_SAVE: ga('CANDIDATE_SAVE'),
  CANDIDATE_SAVE_SUCCESS: ga('CANDIDATE_SAVE_SUCCESS'),

  CANDIDATE_SET_PROP: ga('CANDIDATE_SET_PROP'),
};

export default {
  fetch: ca(actions.CANDIDATE_FETCH, candidateId => ({ candidateId })),
  fetchSuccess: ca(actions.CANDIDATE_FETCH_SUCCESS, candidate => ({ candidate })),

  save: ca(actions.CANDIDATE_SAVE, candidate => ({ candidate })),
  saveSuccess: ca(actions.CANDIDATE_SAVE_SUCCESS, candidate => ({ candidate })),

  setProperty: ca(actions.CANDIDATE_SET_PROP, (property, value) => ({ property, value })),
};
