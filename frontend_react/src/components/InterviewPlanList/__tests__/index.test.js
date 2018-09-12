import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { createStore } from 'redux';
import styles from '../assets/list.css';
import { fromJS } from 'immutable';
import InterviewPlanListWithContainer, { App as InterviewPlanList } from '../index';
import reducers from '../../../reducers/index';
import data from './data';

Enzyme.configure({ adapter: new Adapter() });

describe('InterviewPlanList render', () => {
  it('render empty list', () => {
    const props = {
      interviewPlanList: fromJS([]),
      createNewInterviewPlan: () => 1,
      fetchInterviewPlans: () => 1,
      removeInterviewPlan: () => 1,
    };

    const preview = shallow(<InterviewPlanList {...props} />);
    const text = preview.find(`h3`).text();
    expect(text).toEqual('Список пуст');
  });

  it('render list with three interviewPlans', () => {
    const store = createStore(reducers, fromJS(data));

    const preview = shallow(
      <InterviewPlanListWithContainer store={store} />
    );

    const items = preview.render().find(`.${styles.interviewPlanItem}`);
    expect(items.length).toBe(1);
  });
});
