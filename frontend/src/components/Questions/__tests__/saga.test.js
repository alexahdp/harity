import { expectSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';
import Immutable from 'immutable';
import {
  fetchQuestions,
  addQuestion,
  updateQuestion,
  removeQuestion
} from '../saga';
import api from '../api';
import { actions } from '../actions';


it('fetch questions from state', () => {
  const initialState = Immutable.fromJS({
    questions: {
      questionFetched: true,
      questionList: [{_id: '01', text: 'what?'}],
    }
  });

  return expectSaga(fetchQuestions)
    .withState(initialState)
    .put({
      type: actions.QUESTIONS_FETCHED,
      payload: { questions: initialState.getIn(['questions', 'questionList']) },
    })
    .run()
});


it('fetch questions from server', () => {
  const stub = sinon.stub(api, 'fetch');
  const questions = [
    {_id: '001', text: 'what?'},
  ];
  stub.resolves(questions);

  const initialState = Immutable.fromJS({
    questions: {
      questionFetched: false,
      questionList: [],
    }
  });

  return expectSaga(fetchQuestions)
    .withState(initialState)
    .put({
      type: actions.QUESTIONS_FETCHED,
      payload: { questions },
    })
    .run()
    .then(result => {
      expect(api.fetch.calledOnce).toBe(true);
      stub.restore();
    });
});


it('add question', () => {
  const stub = sinon.stub(api, 'save');
  const apiResult = {
    text: 'what?',
    _id: 'server_id',
  };
  stub.resolves(apiResult);

  const action = {
    payload: {
      question: { text: 'what?' },
    },
  };

  return expectSaga(addQuestion, action)
    .put({
      type: actions.ADD_QUESTION_SUCCESS,
      payload: { question: apiResult },
    })
    .put({
      type: actions.CLEAR_EDIT_QUESTION,
    })
    .run()
    .then(result => {
      expect(api.save.calledOnce).toBe(true);
      expect(api.save.firstCall.args[0]).toBe(action.payload.question);

      stub.restore();
    });
});


it('update question', () => {
  const stub = sinon.stub(api, 'save');
  const apiResult = {
    text: 'what?',
    _id: 'server_id',
  };
  stub.resolves(apiResult);

  const action = {
    payload: {
      question: { text: 'what?' },
    },
  };

  return expectSaga(updateQuestion, action)
    .put({
      type: actions.UPDATE_QUESTION_SUCCESS,
      payload: { question: apiResult },
    })
    .put({
      type: actions.CLEAR_EDIT_QUESTION,
    })
    .run()
    .then(result => {
      expect(api.save.calledOnce).toBe(true);
      expect(api.save.firstCall.args[0]).toBe(action.payload.question);

      stub.restore();
    });
});


it('remove question', () => {
  const stub = sinon.stub(api, 'remove');
  stub.resolves();

  const action = {
    payload: {
      questionId: '001',
    },
  };

  return expectSaga(removeQuestion, action)
    .put({
      type: actions.REMOVE_QUESTION_SUCCESS,
      payload: { questionId: '001' },
    })
    .run()
    .then(result => {
      expect(api.remove.calledOnce).toBe(true);
      expect(api.remove.firstCall.args[0]).toBe('001');

      stub.restore();
    });
});
