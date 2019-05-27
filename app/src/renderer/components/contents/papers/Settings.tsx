import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Notification from './Notification';

const styles = {
  paper: {
    width: '500px',
    height: '680px',
    padding: '20px 30px'
  },
  tabs: {
    'margin-bottom': '20px'
  }
}

interface Props extends WithStyles<typeof styles> {};

class SettingsPaper extends Component<Props> {
  state = {
    value: 0
  }

  handleChange = (event: any, value: Number) => {
    this.setState({value});
  }

  render() {
    const value = this.state.value;
    return(
      <Paper className={this.props.classes.paper}>
        <Tabs value={value} onChange={this.handleChange} className={this.props.classes.tabs}>
          <Tab label="通知"></Tab>
        </Tabs>
        {value === 0 && <Notification/>}
      </Paper>
    );
  }
}

export default withStyles(styles)(SettingsPaper);