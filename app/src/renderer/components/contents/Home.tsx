import React, { Component } from 'react';
import Content from './Content';
import { Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';

class Home extends Component {

  downloadCsv = async () => {
    ipcRenderer.send('click-start-button');
  }

  render() {
    return (
      <Content title="Home">
        <Button　
          variant="contained"　
          color="primary"
          onClick={this.downloadCsv}
        >
        ダウンロード開始
        </Button>
      </Content>
    )
  }
}

export default Home;