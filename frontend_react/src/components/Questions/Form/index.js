import React, { PureComponent, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import styles from '../assets/form.css';

class App extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      _id: props.editQuestion.get('_id'),
      complexity: props.editQuestion.get('complexity'),
      labels: props.editQuestion.get('labels').join(','),
      text: props.editQuestion.get('text'),
    };

    this.setText = this.setText.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
    this.setComplexity = this.setComplexity.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      _id: props.editQuestion.get('_id'),
      complexity: props.editQuestion.get('complexity'),
      labels: props.editQuestion.get('labels').join(','),
      text: props.editQuestion.get('text'),
    });
  }

  submitHandle = () => {
    if (this.state._id) {
      this.props.updateQuestion({
        _id: this.state._id,
        complexity: this.state.complexity,
        labels: this.state.labels.split(','),
        text: this.state.text,
      });
    } else {
      this.props.addQuestion({
        complexity: this.state.complexity,
        labels: this.state.labels.split(','),
        text: this.state.text,
      });
    }

    this.cancelHandle();
  }

  cancelHandle = () => {
    this.setState({
      _id: '',
      complexity: '',
      labels: '',
      text: '',
    });
  }

  setText(e) {
    this.setState({ text: e.target.value });
  }

  setLabels(e) {
    this.setState({ labels: e.target.value });
  }

  setComplexity(e) {
    this.setState({
      complexity: e.target.value,
    });
  }

  render() {
    return (
      <Fragment>
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

        <div>
          <Select
            onChange={this.setComplexity}
            value={this.state.complexity}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
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
      </Fragment>
    );
  }
}

export default App;
