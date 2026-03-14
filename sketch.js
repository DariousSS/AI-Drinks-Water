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
<<<<<<< Updated upstream
  pixelDensity(1 / 5);
=======
  pixelDensity(1);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  spacing = random(20, 300);

=======
  // 大范围随机密度：从稀疏(10几个)到密集(像素感)
  spacing = random(20, 300);

  // 性能保护：单屏最多约2500个，防止太密卡顿
>>>>>>> Stashed changes
  let minSpacing = sqrt((width * height) / 2500);
  if (spacing < minSpacing) spacing = minSpacing;

  alpha = random(60, 220);

<<<<<<< Updated upstream
=======
  // 文字大小跟密度绑定：越密越小，像素感；越疏越大
>>>>>>> Stashed changes
  let baseSize = spacing * random(0.5, 0.95);

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

<<<<<<< Updated upstream
=======
    // 鼠标靠近时排斥
>>>>>>> Stashed changes
    if (d < 120 && d > 0) {
      let force = (1 - d / 120) * 18;
      vx[i] += ((x[i] - mouseX) / d) * force;
      vy[i] += ((y[i] - mouseY) / d) * force;
    }

<<<<<<< Updated upstream
    vx[i] += (homeX[i] - x[i]) * 0.06;
    vy[i] += (homeY[i] - y[i]) * 0.06;

    vx[i] *= 0.75;
    vy[i] *= 0.75;

    x[i] += vx[i];
    y[i] += vy[i];

=======
    // 弹回原位
    vx[i] += (homeX[i] - x[i]) * 0.06;
    vy[i] += (homeY[i] - y[i]) * 0.06;

    // 阻尼
    vx[i] *= 0.75;
    vy[i] *= 0.75;

    // 更新位置
    x[i] += vx[i];
    y[i] += vy[i];

    // 离家越远越透明
>>>>>>> Stashed changes
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
