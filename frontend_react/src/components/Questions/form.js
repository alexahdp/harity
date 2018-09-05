import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './assets/form.css';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      text: props.editQuestion.get('text'),
      labels: props.editQuestion.get('labels').join(','),
      _id: props.editQuestion.get('_id'),
    };

    this.setText = this.setText.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.editQuestion.get('text'),
      labels: props.editQuestion.get('labels').join(','),
      _id: props.editQuestion.get('_id'),
    });
  }

  submitHandle = () => {
    if (this.state._id) {
      this.props.updateQuestion({
        _id: this.state._id,
        text: this.state.text,
        labels: this.state.labels,
      });
    } else {
      this.props.addQuestion({
        text: this.state.text,
        labels: this.state.labels,
      });
    }

    this.setState({
      text: '',
      labels: '',
      _id: null
    });
  }

  cancelHandle = () => {
    this.setState({
      _id: '',
      text: '',
      labels: '',
    });
  }

  setText(e) {
    this.setState({ text: e.target.value });
  }

  setLabels(e) {
    this.setState({ labels: e.target.value.split(',') });
  }

  render() {
    return (
      <div>
        <div className={styles.area}>
          <TextField
            value={this.state.labels}
            fullWidth={true}
            label="labels"
            onChange={this.setLabels}
          />
        </div>
        <div className={styles.area}>
          <TextField
            value={this.state.text}
            fullWidth={true}
            label="question"
            margin="normal"
            multiline={true}
            rows={3}
            onChange={this.setText}
          />
        </div>
        <div className={styles.area}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.submitHandle}
          >
            {this.state._id ? 'Edit' : 'Add'}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.cancelHandle}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
