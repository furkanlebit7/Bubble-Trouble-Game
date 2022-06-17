class Arrow {
  constructor() {
    this.x = 0; //atışın yapıldığı nokta x
    this.y = windowHeight; //atışın yapıldığı nokta y
    this.liveArr = false; //atış var mı yok mu ?
    this.speed = 20; //atış hızı
    this.y_max = 0; //atışın max yüksekliği
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  shoot(x, y) {
    if (this.liveArr) {
      return; //atış varsa yeni bir atış yapılmasını engeller.
    }
    this.x = x;
    this.y = y;
    this.liveArr = true;
  }

  //atış yaptıktan sonra atış ayarlarını sıfırlar
  update() {
    if (!this.liveArr) {
      return; //atış yoksa update çalışmaz
    }
    this.y -= this.speed;
    if (this.y < this.y_max) {
      this.liveArr = false;
      this.y = window.height;
      this.x = window.height;
    }
  }

  //atış animasyonunun çalıştırır
  draw() {
    if (!this.liveArr) return;
    line(this.x + 25, windowHeight, this.x + 25, this.y);
  }
}
