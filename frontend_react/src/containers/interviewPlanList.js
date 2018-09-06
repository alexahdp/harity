import { connect } from 'react-redux';
import InterviewPlanList from '../components/InterviewPlan/list';
import actions from '../actions/interviewPlan';

export default connect(
  state => ({
    interviewPlanList: state.getIn(['interviewPlan', 'list']),
    interviewPlanDialogIsOpened: state.getIn(['interviewPlan', 'interviewPlanDialogIsOpened']),
  }),
  {
    openInterviewPlanDialog: actions.openInterviewPlanDialog,
    closeInterviewPlanDialog: actions.closeInterviewPlanDialog,
  },
)(InterviewPlanList);