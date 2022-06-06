class Hero {
  constructor(currentLife) {
    this.life = currentLife;
    this.x = windowWidth / 2; //karakter x konumu
    this.y = 873; //karakter y konumu
    this.height = 56; //karakter uzunluğu
    this.width = 47.25; //karakter genişliği
    this.velocity = 7; // karakter hızı
    this.isMovingRight = false; //karakter sağa mı gidiyor ?
    this.isMovingLeft = false; //karakter sola mı gidiyor ?
    this.currentFrame = 100;
    this.isShooting = false;
    this.isHit = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
  keypressed(keyCode) {
    if (keyCode == 37) {
      hero.isMovingLeft = true;
    } else if (keyCode == 39) {
      hero.isMovingRight = true;
    }
  }
  keyreleased(keyCode) {
    if (keyCode === 37) {
      hero.isMovingLeft = false;
    } else if (keyCode === 39) {
      hero.isMovingRight = false;
    }
  }
  isKeySpace(keyCode) {
    if (keyCode == 32) {
      hero.shoot();
      hero.isShooting = true;
    }
  }
  update() {
    //hero movement
    if (this.isMovingRight) {
      if (this.x + this.velocity < windowWidth - this.width) {
        this.x += this.velocity;
      } else {
        this.x = windowWidth - this.width;
      }
    } else if (this.isMovingLeft) {
      if (this.x - this.velocity > 0) {
        this.x -= this.velocity;
      } else {
        this.x = 0;
      }
    }
    //collision detection
    for (let b of balls) {
      if (hero.intersects(b)) {
        this.isHit = true;
      }
    }

    if (this.life <= 0) {
      IsGameOver = true;
      audo.pause();
    }
  }
  draw(ctx) {
    let heartX = 1880;

    for (let i = 1; i <= this.life; i++) {
      image(imgHearth, heartX, 10);
      heartX -= 35;
    }

    //sprite animation
    if (!this.isHit && !victory) {
      if (this.isShooting) {
        image(
          imgHero,
          this.x,
          this.y,
          this.width,
          this.height,
          0,
          112,
          this.width,
          this.height
        );

        this.isShooting = false;
      } else if (this.isMovingRight) {
        //TODO: slow down frame rate
        let imageX = this.currentFrame % 189;
        this.currentFrame += 47.25;
        image(
          imgHero,
          this.x,
          this.y,
          this.width,
          this.height,
          imageX,
          0,
          this.width,
          this.height
        );
      } else if (this.isMovingLeft) {
        let imageX = this.currentFrame % 189;
        this.currentFrame += 47.25;
        image(
          imgHero,
          this.x,
          this.y,
          this.width,
          this.height,
          imageX,
          56,
          this.width,
          this.height
        );
      } else {
        image(
          imgHero,
          this.x,
          this.y,
          this.width,
          this.height,
          0,
          112,
          this.width,
          this.height
        );
      }
    } else {
      image(
        imgHero,
        this.x,
        this.y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    }
  }
  shoot() {
    arr.shoot(this.x, this.y);
  }
  intersects(ball) {
    let boundingBoxHalf = this.width / 2 - 20;
    // /find distance between circle center and rect center (horizontal and vertical)
    let ballR = ball.currentRadius;

    let horizontalDist = Math.abs(ball.x - (this.x + boundingBoxHalf));
    let verticalDist = Math.abs(ball.y - (this.y + this.height / 2));

    //if the distance is bigger than half rect + half circle they're too far apart
    if (horizontalDist > boundingBoxHalf + ballR) {
      return false;
    } else if (verticalDist > this.height / 2 + ballR) {
      return false;
    }
    //if distance is less than half rect = definitely colliding
    if (horizontalDist <= boundingBoxHalf) {
      return true;
    } else if (verticalDist <= this.height / 2) {
      return true;
    }

    //check for collision at the corner , compare distance between circle and rectangle centers
    let dX = horizontalDist - boundingBoxHalf;
    let dY = verticalDist - this.height / 2;
    if (dX * dX + dY * dY <= ballR * ballR) {
      return true;
    } else {
      return false;
    }
  }
}
