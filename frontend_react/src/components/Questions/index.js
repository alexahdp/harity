import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import actions from './actions';
import QuestionList from './List';
import QuestionForm from './Form';

class App extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }

  addQuestion = (question) => {
    this.props.addQuestion(question);
  }

  updateQuestion = question => {
    this.props.updateQuestion(question);
  }

  render() {
    return (
      <Grid container spasing={32} justify="space-evenly">
        <Grid item xs={3}>
          <h2>Add Question</h2>
          <QuestionForm
            editQuestion={this.props.editQuestion}
            addQuestion={this.addQuestion}
            updateQuestion={this.updateQuestion}
          />
        </Grid>

        <Grid item xs={4}>
          <h2>Questions List</h2>
          <QuestionList
            questions={this.props.questions}
            editHandle={this.props.setEditQuestion}
            removeHandle={this.props.removeQuestion}
          />
        </Grid>
      </Grid>
    );
  }
}

const ContainerApp = connect(
  state => ({
    questions: state.getIn(['questions', 'questionList']),
    editQuestion: state.getIn(['questions', 'editQuestion']),
  }),
  {
    fetchQuestions: actions.fetchQuestions,
    addQuestion: actions.addQuestion,
    updateQuestion: actions.updateQuestion,
    setEditQuestion: actions.editQuestion,
    removeQuestion: actions.removeQuestion,
  }
)(App);

export { App };
export default ContainerApp;
