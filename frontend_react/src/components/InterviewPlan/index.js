import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuestionsPull from './components/questionsPull';
import Questions from './components/questions';

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
          <Questions interviewPlan={this.props.interviewPlan} />
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
