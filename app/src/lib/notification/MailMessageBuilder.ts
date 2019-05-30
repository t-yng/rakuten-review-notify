export default class MailMessageBuilder {
  private messages: string[];

  constructor() {
    this.messages = ["低評価の商品レビューが投稿されました。", "レビューを確認してください。\n"];
  }

  public append(message: string): void {
    this.messages.push(message);
  }

  public build(): string {
    return this.messages.join("\n");
  }
}