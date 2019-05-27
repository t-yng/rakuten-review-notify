import React, { Component, ReactElement } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Header from './Header';
import Main from './Main';
import SidebarStyle from '../styles/Sidebar';

const styles = {
  content: {
    marginLeft: SidebarStyle.width,
    width: `calc(100% - ${SidebarStyle.width}px)`,
  }
};

interface Props extends WithStyles<typeof styles> {
  title: string
}

class Content extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.classes.content}>
        <Header title={this.props.title}></Header>
        <Main>
          {this.props.children}
        </Main>
      </div>
    )
  }
}

export default withStyles(styles)(Content);