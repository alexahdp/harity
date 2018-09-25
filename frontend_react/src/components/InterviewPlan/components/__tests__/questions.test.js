import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { fromJS } from 'immutable';
import ListItem from '@material-ui/core/ListItem';
import { QuestionsList as Questions } from '../questions';
import data from './data';

Enzyme.configure({ adapter: new Adapter() });

describe('InterviewPlan questions list', () => {
  it('render with two questions', () => {
    const interviewPlan = fromJS(data).get('interviewPlan');

    const props = {
      interviewPlan,
      moveUpQuestion: () => 1,
      moveDownQuestion: () => 1,
      removeQuestion: () => 1,
    };

    const preview = mount(<Questions {...props} />);
    expect(preview.find(ListItem).length).toBe(2);
  });

  // it('remove question', () => {
  //   const props = {
  //     interviewPlan: fromJS(data).get('interviewPlan'),
  //     removeQuestion: sinon.fake(),
  //   };

  //   const preview = mount(<Questions {...props} />);

  //   preview.find(Checkbox).first().simulate('change');
  //   expect(preview.find(Checkbox).length).toBe(2);
  //   expect(props.removeQuestion.callCount).toBe(1);
  // });
});
