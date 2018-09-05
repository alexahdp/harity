import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './assets/list.css';

class App extends PureComponent {
  render() {
    console.log(styles)
    return (
      <List>
        {this.props.questions.map(question => (
          <ListItem divider={true} key={question._id}>
            <div>
            <div className={styles.listHeadBar}>
              <div>
                <IconButton aria-label="Cart">
                  <EditIcon />
                  <DeleteIcon />
                </IconButton>
              </div>
              <div>
                {question.labels.map(label => (<Chip key={label} label={label}/>))}
              </div>
            </div>
              <p>{question.text}</p>
            </div>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default App;
