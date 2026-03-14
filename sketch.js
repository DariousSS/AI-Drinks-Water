let font;
let spacing;
let alpha;
let pixelSize;

let baseSpacing;
let basePixelSize;
let baseAlpha;

let waterLevel = 1.0;

let letterAlpha = [];

function preload() {
  font = loadFont("PlayfairDisplay-Italic-VariableFont_wght.ttf");
}

function setup() {
  rectMode(CENTER);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  spacing = random(30, 120);
  alpha = random(40, 255);
  pixelSize = random(4, 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250);

  textAlign(CENTER);
  textFont(font);
  textSize(64);
  fill(126, 217, 237, alpha);

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      text("H2O", x, y);
    }
  }

  loadPixels();

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let index = (x + y * width) * 4;

      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];

      let blueFactor = waterLevel;

      fill(r * blueFactor, g * blueFactor, b, 120);
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

function mousePressed() {
  waterLevel -= 0.02;

  if (waterLevel < 0) {
    waterLevel = 0;
  }

  baseSpacing = random(30, 120);
  baseAlpha = random(40, 255);
  basePixelSize = int(random(4, 40));

  spacing = baseSpacing;
  pixelSize = basePixelSize;
  alpha = baseAlpha;
}

function mouseDragged() {
  let offset = map(mouseX, 0, width, -20, 20);

  spacing = baseSpacing + offset * 0.5;
  pixelSize = basePixelSize + offset * 0.1;
}
