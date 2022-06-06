function render(ctx) {
  arr.draw(ctx);

  for (let ball of balls) {
    ball.draw(ctx);
  }
  hero.draw(ctx);
  score();

  if (hero.isHit) {
    textSize(128);
    fill(0, 0, 0, 255);
    textFont("Georgia");
    text("A ball got you!", 600, 300);
    fill(0, 0, 0, 255);
    textSize(64);
    text("(Press R to restart level)", 700, 400);
  }
  if (victory) {
    image(imgFreddie, 900, 0);
    imgFreddie.resize(800, 1000);
    textSize(128);
    textFont("Georgia");
    fill(255, 255, 255, 255);
    text("YOU ARE", 200, 450);
    text("VICTORIOUS", 200, 570);
  }
  if (IsGameOver) {
    textSize(128);
    fill(0, 0, 0, 255);
    textFont("Georgia");
    text("Oh, Oh!", 700, 350);
    fill(0, 0, 0, 255);
    textSize(64);
    text("Out of lives!", 750, 450);
  }
}
