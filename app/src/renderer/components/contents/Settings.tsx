import React, { Component } from 'react';
import Content from './Content';
import SettingsPaper from './papers/Settings';

class Settings extends Component {
  render() {
    return (
      <Content title="Settings">
        <SettingsPaper></SettingsPaper>
      </Content>
    )
  }
}

export default Settings;