import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ac from './actions';
import QuestionList from './List';
import QuestionForm from './Form';

class App extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }

  propTypes = {
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    setEditQuestion: PropTypes.func.isRequired,
    questions: PropTypes.instanceOf(Immutable.List).isRequired,
    removeQuestion: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
  }

  addQuestion = question => {
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
    fetchQuestions: ac.fetchQuestions,
    addQuestion: ac.addQuestion,
    updateQuestion: ac.updateQuestion,
    setEditQuestion: ac.editQuestion,
    removeQuestion: ac.removeQuestion,
  },
)(App);

export { App };
export default ContainerApp;
