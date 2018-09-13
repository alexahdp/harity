import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import styles from '../assets/list.css';
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

  it('render list with one interviewPlan', () => {
    const store = createStore(reducers, fromJS(data));

    const preview = mount(
      <InterviewPlanListWithContainer store={store} />
    );

    const renderedPreview = preview.render();
    const items = renderedPreview.find(`.${styles.interviewPlanItem}`);
    expect(items.length).toBe(1);
  });

  it('click edit', () => {
    const store = createStore(reducers, fromJS(data));
    const history = {
      push: sinon.fake()
    };

    const preview = mount(
      <InterviewPlanListWithContainer store={store} history={history} />
    );

    preview.find(EditIcon).simulate('click');
    expect(history.push.callCount).toBe(1);
    expect(history.push.firstCall.args[0]).toBe('/interviewPlan/5b85af5cfb47c4040d7a17b6');

    sinon.restore();
  });

  it('remove click', () => {
    const props = {
      interviewPlanList: fromJS(data).getIn(['interviewPlan', 'list']),
      createNewInterviewPlan: () => 1,
      fetchInterviewPlans: () => 1,
      removeInterviewPlan: sinon.fake(),
    };

    const preview = mount(<InterviewPlanList {...props} />);
    preview.find(DeleteIcon).simulate('click');
    expect(props.removeInterviewPlan.callCount).toBe(1);
    expect(props.removeInterviewPlan.firstCall.args[0]).toBe('5b85af5cfb47c4040d7a17b6');

    sinon.restore();
  });

  it('add new click', () => {
    const props = {
      interviewPlanList: fromJS([]),
      createNewInterviewPlan: sinon.fake(),
      fetchInterviewPlans: () => 1,
      removeInterviewPlan: () => 1,
    };

    const preview = mount(<InterviewPlanList {...props} />);
    preview.find(AddIcon).simulate('click');
    expect(props.createNewInterviewPlan.callCount).toBe(1);

    sinon.restore();
  });
});
