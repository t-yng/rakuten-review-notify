import sendMailFactory from 'sendmail';

interface MailOptions {
  to: string,
  text: string
}

const FROM = '"楽天レビュー通知ツール" <rapid@localhost>';
const SUBJECT = '低評価商品レビュー通知';

export default class MailSend {
  async notify(mailOptions: MailOptions) {
    const sendmail = sendMailFactory({});
    const options = Object.assign(mailOptions, {
      from: FROM,
      subject: SUBJECT,
    })

    sendmail(options, (err, reply) => {
      if(err) {
        console.log(err && err.stack);
      }
    });
  }
}