import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
  contentMain: {
    margin: '50px'
  }
}

interface Props extends WithStyles<typeof styles> {};

class Main extends Component<Props> {
  render() {
    return (
      <div className={this.props.classes.contentMain}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(Main);