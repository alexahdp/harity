import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import actions from '../../actions/interviewPlan';
import styles from './assets/list.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.openInterviewPlan = this.openInterviewPlan.bind(this);
  }
  componentDidMount() {
    this.props.fetchInterviewPlans();
  }

  openInterviewPlan(interviewPlanId) {
    this.props.history.push(`/interviewPlan/${interviewPlanId}`);
  }

  render() {
    const InterviewPlanForm = withRouter(({ history }) => (
      <Button
        onClick={() => this.props.createNewInterviewPlan(this.props.history)}
        variant="fab"
        color="secondary"
        className={styles.fabClassName}
      >
        <AddIcon />
      </Button>
    ));

    return (
      <Grid container spasing={32} justify="space-evenly">
        <Grid item xs={6}>

          <InterviewPlanForm />

          { (this.props.interviewPlanList.size === 0) ?
            (<h3>Список пуст</h3>)
            :
            <List>
              {this.props.interviewPlanList.map(interviewPlan => (
                <ListItem className={styles.interviewPlanItem} key={interviewPlan.get('_id')}>
                  <ListItemText>
                    <h3>{interviewPlan.get('title')}</h3>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton>
                      <EditIcon onClick={() => this.openInterviewPlan(interviewPlan.get('_id'))} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon onClick={() => this.props.removeInterviewPlan(interviewPlan.get('_id'))}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          }
          </Grid>
      </Grid>
    );
  }
}

const ContainerApp = connect(
  state => ({
    interviewPlanList: state.getIn(['interviewPlan', 'list']),
  }),
  {
    createNewInterviewPlan: actions.createNewInterviewPlan,
    fetchInterviewPlans: actions.fetchInterviewPlans,
    removeInterviewPlan: actions.removeInterviewPlan,
  }
)(App);

export { App };
export default ContainerApp;
