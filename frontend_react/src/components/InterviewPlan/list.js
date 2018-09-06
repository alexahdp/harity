import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import styles from './assets/styles.css';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.fetchInterviewPlans();
  }

  render() {
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

          <Button
            variant="fab"
            color="secondary"
            className={styles.fabClassName}
            onClick={this.props.openInterviewPlanDialog}
          >
            <AddIcon />
          </Button>

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
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
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
