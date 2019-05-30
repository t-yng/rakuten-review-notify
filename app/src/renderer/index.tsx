import { ipcRenderer, ipcMain } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import NotificationConfig from '../lib/config/NotificationConfig';

ReactDOM.render(<App />, document.getElementById('root'));

ipcRenderer.on('read-notification-config', () => {
  const config = new NotificationConfig();
  ipcRenderer.send('reply-notification-config', config.read());
});