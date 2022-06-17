class Ball {
  constructor(x, y, r, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.isHit = false;
    this.vx = 5 * velocity;
    this.vy = 5 * velocity;
    this.gravity = 0.5;
    this.gen = 1;
    this.currentRadius = this.r * (5 - this.gen);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getR() {
    return this.r;
  }
  draw(ctx) {
    fill("#000000");
    circle(this.x, this.y, this.currentRadius);
  }
  collidedWithProjectile(pL) {
    if (pL != undefined) {
      let xCollides =
        pL.x + 25 >= this.x - this.currentRadius &&
        pL.x + 25 <= this.x + this.currentRadius;
      if (xCollides && this.y >= pL.y) {
        //top point below project top point
        points++;
        this.isHit = true;
        pL.liveArr = false;
        console.log("Ball isHit : " + this.isHit);
      } else if (
        Math.sqrt(
          (this.x - pL.x) * (this.x - pL.x) + (this.y - pL.y) * (this.y - pL.y)
        ) <= this.currentRadius
      ) {
        points++;
        pL.liveArr = false;
        this.isHit = true;
      }
    }
  }
  update(pL) {
    if (this.x + this.r >= canvas.width || this.x - this.r <= 0)
      this.vx = -this.vx;
    if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
      this.vy = -this.vy;
      if (this.y + this.r >= canvas.height) {
        this.y = canvas.height - this.r;
        this.vy -= this.gravity;
      }
    }
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (pL.liveArr) {
      this.collidedWithProjectile(pL);
    }
  }
  splitToBalls(balls) {
    if (this.gen > 3) {
      return;
    }

    let ball1 = new Ball(this.x - 10, this.y + 3, this.r, -1);
    let ball2 = new Ball(this.x + 10, this.y + 3, this.r, 1);
    ball1.gen = this.gen + 1;
    ball2.gen = this.gen + 1;
    balls.push(ball1);
    balls.push(ball2);
    this.isHit = false;
    ball1.currentRadius = this.r * (5 - ball1.gen);
    ball2.currentRadius = this.r * (5 - ball2.gen);
  }
}
