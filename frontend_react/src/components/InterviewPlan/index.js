import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchQuestions();
  }

  componentWillReceiveProps(props) {
    if (props.match.params.interviewPlanId !== props.interviewPlan.get('_id')) {
      props.getInterviewPlan(props.match.params.interviewPlanId);
    }
  }

  render() {
    const selectedQuestionsMap = this.props.interviewPlan.get('questions').reduce((o, question) => {
      o[question.get('_id')] = question;
      return o;
    }, {});

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
          <Grid item xs={4}>
            <h2>Source questions list</h2>

            <List>
              {this.props.questions
                .filter(question => !selectedQuestionsMap[question.get('_id')])
                .map(question => (
                  <ListItem key={question.get('_id')} divider={true}>
                    <ListItemText>
                      <h3>{question.get('text')}</h3>
                    </ListItemText>
                    <Checkbox
                      onChange={() => this.props.addQuestion(question.get('_id'))}
                    />
                  </ListItem>)
                )
              }
            </List>
          </Grid>

          <Grid item xs={4}>
            <h2>Target questions list</h2>

            <List>
              {this.props.interviewPlan.get('questions')
                .map(question => (
                  <ListItem key={question.get('_id')} divider={true}>
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
              onClick={this.props.save}
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
