import { app, BrowserWindow, ipcMain } from 'electron'
import puppeteer from 'puppeteer-core';
import parse from 'csv-parse/lib/sync';
import RMS from '../lib/rms';
import MailSend from '../lib/notification/MailSend';
import MailMessageBuilder from '../lib/notification/MailMessageBuilder';

const createWindow = (): BrowserWindow => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('app/views/index.html');
  return win;
}

const getDefaultOsChromePath = () => {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  } else {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
}

const downloadCsv = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getDefaultOsChromePath(),
  });

  try {
    const pages = await browser.pages()
    const page = pages[0]
    const rms = new RMS(page)
    await rms.login()
    const csv = await rms.downloadReviewCsv()
    browser.close();

    return csv;
  } catch(err) {
    browser.close();
    throw err;
  }
}

(async () => {
  let window: BrowserWindow;

  app.on('ready', () => {
    window = createWindow();
  });

  ipcMain.on('click-start-button', async () => {
    const csv = await downloadCsv();

    ipcMain.once('reply-notification-config', (event: any, config: any) => {
      // csvから送信内容を生成
      const builder = new MailMessageBuilder();
      const reviews = parse(csv, { columns: true });
      reviews.forEach( (review: any) => {
        const message = [
          `商品名: ${review['商品名']}`,
          `レビュー詳細URL: ${review['レビュー詳細URL']}`,
          `評価: ${review['評価']}`,
          `レビュー本文:\n${review['レビュー本文']}\n\n`
        ].join("\n");

        builder.append(message);
      });

      // 設定されたメールアドレスにメールを送信
      const text = builder.build();
      const sender = new MailSend();
      sender.notify({
        to: config.mailAddresses[0],
        text: text,
      });
    });

    window.webContents.send('read-notification-config');
  });
})();
