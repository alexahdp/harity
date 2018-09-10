import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import QuestionsPull from './questionsPull';
import styles from './assets/index.css';

class App extends PureComponent {
  constructor() {
    super();

    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(props) {
    if (
      props.match.params.interviewPlanId !== props.interviewPlan.get('_id') &&
      props.match.params.interviewPlanId
    ) {
      props.getInterviewPlan(props.match.params.interviewPlanId);
    }
  }

  save() {
    // ЭТО дичь, но как делать правильно пока не знаю
    this.props.save(this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Grid container spasing={0} justify="space-evenly">
          <Grid item xs={8}>
            <TextField
              value={this.props.interviewPlan.get('title')}
              onChange={e => this.props.setTitle(e.target.value)}
              fullWidth={true}
              label="Title"
              margin="normal"
            />
          </Grid>
        </Grid>

        <Grid container spasing={0} justify="space-evenly">
          <QuestionsPull />

          <Grid item xs={4}>
            <h2>Target questions list</h2>

            <List>
              {this.props.interviewPlan.get('questions')
                .map(question => (
                  <ListItem key={question.get('_id')} divider={true} className={styles.targetListItem}>
                    <IconButton
                      aria-label="Cart"
                      onClick={() => this.props.moveDownQuestion(question.get('_id'))}
                    >
                      <ExpandMoreIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Cart"
                      onClick={() => this.props.moveUpQuestion(question.get('_id'))}
                    >
                      <ExpandLessIcon />
                    </IconButton>

                    <ListItemText>
                      <h3>{question.get('text')}</h3>
                    </ListItemText>
                    <Checkbox
                      checked
                      onChange={() => this.props.removeQuestion(question.get('_id'))}
                    />
                  </ListItem>)
                )
              }
            </List>
          </Grid>
        </Grid>

        <Grid container spasing={0} justify="space-evenly">
          <Grid item xs={8}>
            <Button
              onClick={this.save}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
