let font;

let homeX = [];
let homeY = [];
let x = [];
let y = [];
let vx = [];
let vy = [];
let sizes = [];

let spacing;
let alpha;

function preload() {
  font = loadFont("PlayfairDisplay-Italic-VariableFont_wght.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1 / 5);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(font);
  generateLetters();
}

function generateLetters() {
  homeX = [];
  homeY = [];
  x = [];
  y = [];
  vx = [];
  vy = [];
  sizes = [];

  spacing = random(20, 120);

  let minSpacing = sqrt((width * height) / 5000);
  if (spacing < minSpacing) spacing = minSpacing;

  alpha = random(60, 220);

  // 粒子少（spacing大）时字小清晰，粒子多（spacing小）时字大像素感强
  let sizeFactor = map(spacing, 20, 120, 1.4, 0.45);
  let baseSize = spacing * sizeFactor;

  for (let px = spacing / 2; px < width; px += spacing) {
    for (let py = spacing / 2; py < height; py += spacing) {
      homeX.push(px);
      homeY.push(py);
      x.push(px);
      y.push(py);
      vx.push(0);
      vy.push(0);
      sizes.push(baseSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateLetters();
}

function draw() {
  background(250);

  for (let i = 0; i < x.length; i++) {
    let d = dist(x[i], y[i], mouseX, mouseY);

    if (d < 120 && d > 0) {
      let force = (1 - d / 120) * 18;
      vx[i] += ((x[i] - mouseX) / d) * force;
      vy[i] += ((y[i] - mouseY) / d) * force;
    }

    vx[i] += (homeX[i] - x[i]) * 0.06;
    vy[i] += (homeY[i] - y[i]) * 0.06;

    vx[i] *= 0.75;
    vy[i] *= 0.75;

    x[i] += vx[i];
    y[i] += vy[i];

    let displacement = dist(x[i], y[i], homeX[i], homeY[i]);
    let a = map(displacement, 0, 150, alpha, alpha * 0.3);

    textSize(sizes[i]);
    fill(126, 217, 237, a);
    text("H2O", x[i], y[i]);
  }
}

function mousePressed() {
  generateLetters();
}
