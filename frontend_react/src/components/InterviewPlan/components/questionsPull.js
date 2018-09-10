import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import questionsActions from '../../../actions/questions';
import actions from '../../../actions/interviewPlan';
import { getCurrentInterviewQuestionsMap } from '../../../selectors/questionsToMap';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      filterTag: '',
    };

    this.setFilterTag = this.setFilterTag.bind(this);
  }

  setFilterTag(e) {
    this.setState({
      filterTag: e.target.value,
    });
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
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
            .filter(question => ( ! this.props.currentInterviewQuestionsMap[question.get('_id')]))
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
    );
  }
}

const ContainerApp = connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    currentInterviewQuestionsMap: getCurrentInterviewQuestionsMap(state),
  }),
  {
    addQuestion: actions.addQuestion,
    fetchQuestions: questionsActions.fetchQuestions,
    getInterviewPlan: actions.getInterviewPlan,
  }
)(App);

export { App };
export default ContainerApp;
