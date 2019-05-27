import React, { Component, ReactElement } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  link: {
    textDecoration: 'none'
  }
}

interface Props extends WithStyles<typeof styles> {
  text: string,
  to: string,
  icon: ReactElement,
}

class SidebarListItem extends Component<Props> {
  private classes: any;

  constructor(props: Props) {
    super(props);
    this.classes = props.classes;
  }

  render() {
    return(
      <Link to={this.props.to} className={this.classes.link}>
        <ListItem button>
          <ListItemIcon>
            {this.props.icon}
          </ListItemIcon>
          <ListItemText primary={this.props.text}></ListItemText>
        </ListItem>
      </Link>
    );
  }
}

export default withStyles(styles)(SidebarListItem)