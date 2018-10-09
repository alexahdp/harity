import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { CandidateList } from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('Candidate List', () => {
  it('Empty list', () => {
    const props = {
      addCandidate: () => 1,
      candidates: fromJS([]),
      fetchCandidates: () => 1,
      gotoCandidate: () => 1,
      removeCandidate: () => 1,
      resetCurrentCandidate: () => 1,
    };

    const preview = shallow(<CandidateList {...props} />);
    const text = preview.find('h3').text();
    expect(text).toEqual('Список пуст');
  });

  it('Add candidate', () => {
    const props = {
      addCandidate: sinon.fake(),
      candidates: fromJS([]),
      fetchCandidates: () => 1,
      gotoCandidate: () => 1,
      removeCandidate: () => 1,
      resetCurrentCandidate: () => 1,
    };

    const preview = mount(<CandidateList {...props} />);
    preview.find(Button).simulate('click');
    expect(props.addCandidate.callCount).toBe(1);
  });

  it('Remove candidate', () => {
    const props = {
      addCandidate: () => 1,
      candidates: fromJS([{
        _id: '111',
        birthYear: '1989',
        email: 'test@gmail.com',
        firstName: 'Bob',
        lastName: 'Dilan',
        createdAt: new Date(Date.now() - 1000 * 420),
        description: 'Very smart',
        level: 'junior',
      }]),
      fetchCandidates: () => 1,
      gotoCandidate: () => 1,
      removeCandidate: sinon.fake(),
      resetCurrentCandidate: () => 1,
    };

    const preview = mount(<CandidateList {...props} />);
    preview.find(DeleteIcon).simulate('click');
    expect(props.removeCandidate.callCount).toBe(1);
    expect(props.removeCandidate.firstCall.args[0]).toBe('111');
  });
});
