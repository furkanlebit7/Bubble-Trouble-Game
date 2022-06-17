var IsGameOver = false;

var continueGame = false;
var victory = false;
var points = 0;
var x;
var bg;
var hero, ball, arr, balls;

var imgHearth;
var imgHero;

function setup() {
  bg = loadImage("./images/background.png");
  imgHearth = loadImage("./images/heart32x32.png");
  imgHero = loadImage("./images/hero_47-25x56.png");
  imgFreddie = loadImage("./images/Victory338x450.png");
  x = createCanvas(windowWidth, windowHeight);
  hero = new Hero(5);
  ball = new Ball(200, 200, 20, 1);
  balls = [];
  balls.push(ball);
  arr = new Arrow();
}

function draw() {
  background(bg);
  if (!IsGameOver && !victory) {
    update();
  }
  render();

  score();
}
function keyPressed() {
  hero.keypressed(keyCode);
  hero.isKeySpace(keyCode);
  keyCode === 82 ? (continueGame = true) : (continueGame = false);
}
function keyReleased() {
  hero.keyreleased(keyCode);
}
