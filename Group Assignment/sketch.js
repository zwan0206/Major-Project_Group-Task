function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0, 85, 128);
  let numCircles = 5; // 对角线上的圆的数量
  let circleSize = sqrt(sq(width) + sq(height)) / numCircles;//圆的直径

  //绘制对角线上的圆
  for (let i = 0; i < numCircles; i++) {
    let posX = (i + 1) * (circleSize * 0.5) + i * (circleSize * 0.25);
    let posY = posX;
    drawConcentricCircles(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
  }
  // 绘制对角线上方的圆
  for (let j = 0; j < numCircles - 1; j++) {
    let upperCircleX = j * (circleSize * 0.75) + (circleSize * 1.55);
    let upperCircleY = j * (circleSize * 0.75) + (circleSize * 0.15);
    drawConcentricCircles(upperCircleX, upperCircleY, circleSize);
    drawSurroundingCircles(upperCircleX, upperCircleY, 20, numCircles, circleSize);
    if (j == 1 || j == 2){
      drawFilledSurroundingCircles(upperCircleX, upperCircleY, circleSize);
    }
    if (j == 0 || j == 3) {
      drawZigzagLines(upperCircleX, upperCircleY, circleSize);
    }
  }

  for (let a = 0; a < numCircles - 2; a++) {
    let upperCircleX1 = a * (circleSize * 0.75) + (circleSize * 2.7);
    let upperCircleY1 = a * (circleSize * 0.75) - (circleSize * 0.125);
    drawConcentricCircles(upperCircleX1, upperCircleY1, circleSize);
    drawSurroundingCircles(upperCircleX1, upperCircleY1, 70, numCircles, circleSize);
    drawFilledSurroundingCircles(upperCircleX1, upperCircleY1, circleSize)
  }

  // 绘制对角线下方的圆
  for (let b = 0; b < numCircles - 1; b++) {
    let lowerCircleX = b * (circleSize * 0.75) + (circleSize * 0.15);
    let lowerCircleY = b * (circleSize * 0.75) + (circleSize * 1.5);
    drawConcentricCircles(lowerCircleX, lowerCircleY, circleSize);
    drawSurroundingCircles(lowerCircleX, lowerCircleY, 55, numCircles, circleSize);
    if (b == 0 || b == 2 || b == 3){
    drawFilledSurroundingCircles(lowerCircleX, lowerCircleY, circleSize);
    }
    if (b == 1) {
      drawZigzagLines(lowerCircleX, lowerCircleY, circleSize);
    }
  }

  for (let c = 0; c < numCircles - 3; c++) {
    let lowerCircleX1 = c * (circleSize * 0.75) - (circleSize * 0.275);
    let lowerCircleY1 = c * (circleSize * 0.75) + (circleSize * 2.50);
    drawConcentricCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawSurroundingCircles(lowerCircleX1, lowerCircleY1, 100, numCircles, circleSize);
    drawFilledSurroundingCircles(lowerCircleX1, lowerCircleY1, circleSize)
  }
}

function drawZigzagLines(centerX, centerY, circleSize) {
  let radius = circleSize / 2;
  let numZigzags = 80;
  let angleStep = 360 / numZigzags;

  push();
  stroke(255, 0, 0); // Set zigzag color
  noFill();
  strokeWeight(2); // Set zigzag line weight

  beginShape();
  for (let i = 0; i <= numZigzags; i++) {
    let angle = radians(i * angleStep);
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    vertex(x, y);
    radius = i % 2 === 0 ? circleSize / 2 : circleSize / 4; // Alternate between two radii for zigzag effect
  }
  endShape(CLOSE);
  pop();
}

function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25; // 小圆的直径
  let radius = circleSize / 2 - smallCircleSize / 2 - 2; // 小圆中心到大圆中心的距离
  
  for (let i = 0; i < 5; i++) {
    for (angle = 0; angle < 360; angle += 10) {
      let rad = radians(angle);
      let x = centerX + (radius - (i * 10)) * cos(rad);
      let y = centerY + (radius - (i * 10)) * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15; // 小圆的直径
  let radius = circleSize / 2 + smallCircleSize / 2 + 2; // 小圆中心到大圆中心的距离

  for (let i = 0; i < numCircles; i++) {
    for (angle; angle < 360; angle += 72) {
      let rad = radians(angle);
      let x = centerX + radius * cos(rad);
      let y = centerY + radius * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}
//绘制同轴圆形组合的方法
function drawConcentricCircles(x, y, size) {
  const layers = random(4, 8); // 随机层数
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    fill(randomColor()); // 使用随机颜色
    ellipse(x, y, currentSize, currentSize);
    currentSize *= 0.7; // 层级大小递减
  }
}

function randomColor() {
  return color(random(255), random(255), random(255));
}
