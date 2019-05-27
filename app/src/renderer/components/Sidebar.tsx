import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Drawer  from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarListItem from './SidebarListItem';
import SidebarStyle from './styles/Sidebar';

const styles = {
  drawer: {
    width: SidebarStyle.width
  },
  drawerPaper: {
    width: SidebarStyle.width
  }
}

interface Props extends WithStyles<typeof styles> {}

class Sidebar extends Component<Props> {
  private classes: any;

  constructor(props: Props) {
    super(props);
    const { classes } = props;
    this.classes = classes;
  }

  render() {
    return (
      <Drawer
        open={true}
        variant="permanent"
        className={this.classes.drawer}
        classes={{
          paper: this.classes.drawerPaper
        }}
      >
        <Toolbar></Toolbar>
        <Divider></Divider>
        <List>
          <SidebarListItem icon={<HomeIcon/>} text="Home" to="/"></SidebarListItem>
          <SidebarListItem icon={<SettingsIcon/>} text="Settings" to="/settings"></SidebarListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar)