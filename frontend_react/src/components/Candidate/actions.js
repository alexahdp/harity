import { createAction } from 'redux-actions';
import ga from '../../helpers/genAction';

export const actions = {
  CANDIDATE_SAVE: ga('CANDIDATE_SAVE'),
  CANDIDATE_SET_PROP: ga('CANDIDATE_SET_PROP'),
  CANDIDATE_REMOVE: ga('CANDIDATE_REMOVE'),
  CANDIDATE_FETCH_LIST: ga('CANDIDATE_FETCH_LIST'),
  CANDIDATE_FETCH_LIST_SUCCESS: ga('CANDIDATE_FETCH_LIST_SUCCESS'),
  CANDIDATE_RESET_CURRENT: ga('CANDIDATE_RESET_CURRENT'),
};

export default {
  fetchList: createAction(actions.CANDIDATE_FETCH_LIST),
  fetchListSuccess: createAction(actions.CANDIDATE_FETCH_LIST_SUCCESS, candidates => ({ candidates })),
  remove: createAction(actions.CANDIDATE_REMOVE),
  resetCurrent: createAction(actions.CANDIDATE_RESET_CURRENT),
  save: createAction(actions.CANDIDATE_SAVE),
  setProperty: createAction(actions.CANDIDATE_SET_PROP, (property, value) => ({ property, value })),
};
