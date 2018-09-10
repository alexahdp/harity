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
import styles from './assets/index.css';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      filterTag: '',
    };

    this.setFilterTag = this.setFilterTag.bind(this);
    this.save = this.save.bind(this);
  }

  setFilterTag(e) {
    this.setState({
      filterTag: e.target.value,
    });
  }

  componentDidMount() {
    this.props.fetchQuestions();
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

            <TextField
              value={this.state.filterTag}
              label="Tag filter"
              fullWidth={true}
              margin="normal"
              onChange={this.setFilterTag}
            />

            <List>
              {this.props.questions
                .filter(question => ( ! selectedQuestionsMap[question.get('_id')]))
                .filter(question => {
                  if (this.state.filterTag !== '') {
                    return question.get('labels').some(label => label.includes(this.state.filterTag));
                  }

                  return true;
                })
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
