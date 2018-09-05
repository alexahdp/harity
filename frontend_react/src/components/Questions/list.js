import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './assets/list.css';

class App extends Component {
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

  render() {
    if (this.props.questions.size === 0) {
      return (
        <h3>Список пуст</h3>
      );
    }

    return (
      <div>
        <TextField
          value={this.state.filterTag}
          label="Tag filter"
          fullWidth={true}
          margin="normal"
          onChange={this.setFilterTag}
        />

        <List>
          {this.props.questions
            .filter(question => {
              if (this.state.filterTag === '') return true;
              return question.get('labels').some(label => label.includes(this.state.filterTag));
            })
            .map(question => (
              <ListItem divider={true} key={question.get('_id')} className={styles.listItem}>
                <div className={styles.listItemBar}>
                  <div className={styles.listItemBarLeftSlot}>
                  {question.get('labels').map(label => (
                    <Chip key={label} label={label} className={styles.chip} />
                  ))}
                  </div>
                  <div className={styles.listItemBarRightSlot}>
                    <IconButton
                      aria-label="Cart"
                      onClick={() => this.props.editHandle(question.get('_id'))}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Cart"
                      onClick={() => this.props.removeHandle(question.get('_id'))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <p className={styles.text}>{question.get('text')}</p>
              </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
