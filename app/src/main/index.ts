import { app, BrowserWindow, ipcMain } from 'electron'
import puppeteer from 'puppeteer';
import RMS from '../lib/rms';

const createWindow = () => {
  const win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('app/views/index.html')
}

const downloadCsv = async () => {
  console.log('start download csv ...');
  const browser = await puppeteer.launch({
    headless: false,
  });
  const pages = await browser.pages()
  const page = pages[0]
  const rms = new RMS(page)
  await rms.login()
  // const csv = await rms.downloadReviewCsv()
  // console.log(csv)
}

(async () => {
  app.on('ready', createWindow)

  ipcMain.on('click-start-button', async () => {
    console.log('クリックされたよ');
    await downloadCsv();
  });
})()
