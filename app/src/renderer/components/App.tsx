import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import '../css/App.css';
import Sidebar from './Sidebar';
import Home from './contents/Home';
import Settings from './contents/Settings';
import { WithStyles, withStyles } from '@material-ui/core';

const styles = {
  app: {
    'text-align': 'start'
  }
}

interface Props extends WithStyles<typeof styles> {};

class App extends Component<Props> {
  render() {
    return (
      <Router>
        <div className={this.props.classes.app}>
          <Sidebar></Sidebar>
          <Route exact path="/" component={Home}></Route>
          <Route path="/settings" component={Settings}></Route>
        </div>
      </Router>
    );
  }
}

if(!location.hash.length) {
  location.hash = '#/';
}

export default withStyles(styles)(App);
