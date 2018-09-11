import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import actions from '../../actions/interviewPlan';
import styles from './assets/list.css';

const App = props => (
  <Grid container spasing={32} justify="space-evenly">
    <Grid item xs={6}>

      <Button
        onClick={() => props.createNewInterviewPlan(props.history)}
        variant="fab"
        color="secondary"
        className={[styles.fabClassName, styles.addInterviewPlanButton]}
      >
        <AddIcon />
      </Button>

      { (props.interviewPlanList.size === 0) ?
        (<h3>Список пуст</h3>)
        :
        <List>
          {props.interviewPlanList.map(interviewPlan => (
            <ListItem className={styles.interviewPlanItem} key={interviewPlan.get('_id')}>
              <ListItemText>
                <h3>{interviewPlan.get('title')}</h3>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon onClick={() => props.openInterviewPlan(interviewPlan.get('_id'))} />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={() => props.removeInterviewPlan(interviewPlan.get('_id'))}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      }
      </Grid>
  </Grid>
);

const ContainerApp = compose(
  connect(state => ({
      interviewPlanList: state.getIn(['interviewPlan', 'list']),
    }),
    {
      createNewInterviewPlan: actions.createNewInterviewPlan,
      fetchInterviewPlans: actions.fetchInterviewPlans,
      removeInterviewPlan: actions.removeInterviewPlan,
    }
  ),
  withHandlers({
    openInterviewPlan: props => interviewPlanId => {
      props.history.push(`/interviewPlan/${interviewPlanId}`);
    },
  }),
  lifecycle({
    componentDidMount(props) {
      props.fetchInterviewPlans();
    },
  })
)(App);

export { App };
export default ContainerApp;
