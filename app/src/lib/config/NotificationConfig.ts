interface Notification {
  mailAddresses: string[],
}

class NotificationConfig {
  private readonly STORAGE_KEY = 'notification-config';
  private cache?: Notification;

  getDefaultValues() {
    return {
      mailAddresses: [''],
    }
  }

  read(): Notification {
    if(this.cache != undefined) return this.cache;

    // 設定値を読み込む
    const json = localStorage.getItem(this.STORAGE_KEY);
    if(json === null) return this.getDefaultValues();

    const values = JSON.parse(json);
    this.cache  = values;

    return values;
  }

  save(values: Notification) {
    const saveValues = this.read();
    const updateValues = Object.assign({}, saveValues, values);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updateValues));
  }
}

export default NotificationConfig