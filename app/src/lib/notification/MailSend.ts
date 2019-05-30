import sendMailFactory from 'sendmail';

interface MailOptions {
  to: string,
  message: string
}

const FROM = '"楽天レビュー通知ツール" <rapid@localhost>';
const SUBJECT = '低評価商品レビュー通知';

export default class MailSend {
  async notify(mailOptions: MailOptions) {
    const sendmail = sendMailFactory({});
    const options = {
      from: FROM,
      to: mailOptions.to,
      subject: SUBJECT,
      html: mailOptions.message,
    };

    sendmail(options, (err, reply) => {
      if(err) {
        console.log(err && err.stack);
      }
    });
  }
}