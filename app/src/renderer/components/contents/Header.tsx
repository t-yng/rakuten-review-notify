import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  appBar: {
    boxShadow: 'none',
  }
};

interface Props extends WithStyles<typeof styles> {
  title: string
}

class Header extends Component<Props> {
  private title: string
  private classes: any

  constructor(props: Props) {
    super(props)
    const { title, classes } = props
    this.classes = classes
    this.title = title
  }

  render() {
    return (
      <div className="content-header">
        <AppBar position="static" className={this.classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {this.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);