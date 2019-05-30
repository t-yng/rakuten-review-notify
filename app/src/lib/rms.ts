import fs from 'fs';
import { app } from 'electron';
import { Page, CDPSession } from "puppeteer";
import * as chokidar from 'chokidar';
import iconv from 'iconv-lite';

export default class RMS {
  private page:Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    const page = this.page;
    await page.goto(RMS.LOGIN_PAGE_URL);

    // ID・パスワードを管理したくないので、ログインだけは手動でする
    // R-Loignのログインの完了を待機
    await page.waitFor('#rlogin-username-2-ja');
    await page.waitFor('#rlogin-password-2-ja');

    // 楽天ログインの完了を待機
    await page.waitForNavigation()
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("お気をつけください")'
    );

    await Promise.all([
      page.click('button[name="submit"]'),
      page.waitForNavigation()
    ]);

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation()
    ]);
  }

  async downloadReviewCsv(): Promise<string> {
    const page = this.page;
    await page.goto(RMS.DOWNLOAD_REVIEW_PAGE_URL);

    // TODO: レビュー期間を設定

    // ファイルがダウンロードされたら文字列を読み込んでプロミスを解決する
    const promise: Promise<string> = new Promise((resolve) => {
      chokidar.watch(RMS.DOWNLOAD_DIR, {
        persistent: false
      }).on('add', (path:string) => {
        // ダウンロードしたレビューCSVを読み込む
        const buf = fs.readFileSync(path)
        const csv = iconv.decode(buf, 'Shift_JIS')
        resolve(csv)
      });
    });

    // CSVダウンロード
    if(!fs.existsSync(RMS.DOWNLOAD_DIR)) {
      fs.mkdirSync(RMS.DOWNLOAD_DIR);
    }
    const client:CDPSession = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: RMS.DOWNLOAD_DIR
    });
    await page.click('#csv_download a');

    return promise;
  }

  static get DOWNLOAD_DIR() {
    return `${app.getAppPath()}/app/downloads`;
  }

  static get LOGIN_PAGE_URL() {
    return 'https://glogin.rms.rakuten.co.jp/?sp_id=1'
  }

  static get DOWNLOAD_REVIEW_PAGE_URL() {
    const url = 'https://review.rms.rakuten.co.jp/search/index/'
    const testUrl = 'https://review.rms.rakuten.co.jp/search/index/?sy=2019&sm=1&sd=1&sh=0&si=0&ey=2019&em=5&ed=30&eh=23&ei=59&ev=1&tc=1&kw=&ao=A&st=1'
    return testUrl
  }
}
