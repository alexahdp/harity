import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import questionsActions from '../../Questions/actions';
import ac from '../actions';
import { getCurrentInterviewQuestionsMap } from '../../../selectors/questionsToMap';
import styles from '../assets/index.css';

class QuestionsPull extends PureComponent {
  constructor() {
    super();

    this.state = {
      filterTag: '',
    };

    this.setFilterTag = this.setFilterTag.bind(this);
  }

  propTypes = {
    addQuestion: PropTypes.func.isRequired,
    currentInterviewQuestionsMap: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    getInterviewPlan: PropTypes.func.isRequired,
    questions: PropTypes.instanceOf(Immutable.List).isRequired,
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
            .filter(question => (!this.props.currentInterviewQuestionsMap[question.get('_id')]))
            .filter(question => {
              if (this.state.filterTag !== '') {
                return question.get('labels').some(label => label.includes(this.state.filterTag));
              }

              return true;
            })
            .map(question => (
              <ListItem
                key={question.get('_id')}
                divider={true}
                disableGutters={true}
                dense={true}
              >
                <div className={styles.questionTags}>
                  {question.get('labels').map(label => (
                    <Chip
                      key={label}
                      label={label}
                      classes={{ label: styles.questionTag }}
                    />
                  ))}
                </div>
                <ListItemText>
                  <p>{question.get('text')}</p>
                </ListItemText>
                <Checkbox
                  onChange={() => this.props.addQuestion(question.get('_id'))}
                />
              </ListItem>))
          }
        </List>
      </Grid>
    );
  }
}

const ContainerQuestionsPull = connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    currentInterviewQuestionsMap: getCurrentInterviewQuestionsMap(state),
  }),
  {
    addQuestion: ac.addQuestion,
    fetchQuestions: questionsActions.fetchQuestions,
    getInterviewPlan: ac.getInterviewPlan,
  },
)(QuestionsPull);

export default ContainerQuestionsPull;
