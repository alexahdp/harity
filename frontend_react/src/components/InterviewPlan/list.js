import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import styles from './assets/list.css';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

          <Dialog
            open={this.props.interviewPlanDialogIsOpened}
          >
            <DialogTitle>Add new</DialogTitle>
            <DialogContent>
              <TextField
                value={"Test"}
                fullWidth={true}
                label="Text"
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.props.addInterviewPlan}
              >
                Save
              </Button>
              <Button
                onClick={this.props.closeInterviewPlanDialog}
              >
                Cancel
              </Button>
            </DialogActions>

          </Dialog>

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

export default App;
