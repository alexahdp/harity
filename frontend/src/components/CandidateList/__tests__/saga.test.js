import { expectSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';
import { remove, fetchList } from '../saga';
import api from '../../Candidate/api';
import { actions } from '../actions';

it('remove user', () => {
  const stub = sinon.stub(api, 'remove');

  const action = {
    payload: { candidateId: '000' }
  };

  return expectSaga(remove, action)
    .put({
      type: actions.CANDIDATE_REMOVE_SUCCESS,
      payload: { candidateId: '000' },
    })
    .run()
    .then(result => {
      expect(api.remove.calledOnce).toBe(true);
      expect(api.remove.firstCall.args[0]).toBe('000');

      stub.restore();
    });
});

it('fetch user list', () => {
  const stub = sinon.stub(api, 'fetchList');
  const userList = [{
    _id: '001',
    username: 'test',
  }];
  stub.resolves(userList);

  return expectSaga(fetchList)
    .put({
      type: actions.CANDIDATE_FETCH_LIST_SUCCESS,
      payload: { candidates: userList }
    })
    .run()
    .then(result => {
      expect(api.fetchList.calledOnce).toBe(true);
      stub.restore();
    });
});
