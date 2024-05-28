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
    drawEllipsesAroundCircle(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
    drawExtendingLine(posX, posY, circleSize);
  }

  // 绘制对角线上方的圆
  for (let j = 0; j < numCircles - 1; j++) {
    let upperCircleX = j * (circleSize * 0.80) + (circleSize * 1.55);
    let upperCircleY = j * (circleSize * 0.80) + (circleSize * 0.15);
    drawConcentricCircles(upperCircleX, upperCircleY, circleSize);
    drawEllipsesAroundCircle(upperCircleX, upperCircleY, circleSize);
    drawSurroundingCircles(upperCircleX, upperCircleY, 20, numCircles, circleSize);
    if (j == 1 || j == 2){
      drawFilledSurroundingCircles(upperCircleX, upperCircleY, circleSize);
    }
    if (j == 0 || j == 3) {
      drawZigzagLines(upperCircleX, upperCircleY, circleSize);
    }
    drawExtendingLine(upperCircleX, upperCircleY, circleSize);
  }

  for (let a = 0; a < numCircles - 2; a++) {
    let upperCircleX1 = a * (circleSize * 0.80) + (circleSize * 2.7);
    let upperCircleY1 = a * (circleSize * 0.80) - (circleSize * 0.125);
    drawConcentricCircles(upperCircleX1, upperCircleY1, circleSize);
    drawEllipsesAroundCircle(upperCircleX1, upperCircleY1, circleSize);
    drawSurroundingCircles(upperCircleX1, upperCircleY1, 70, numCircles, circleSize);
    drawFilledSurroundingCircles(upperCircleX1, upperCircleY1, circleSize);
    drawExtendingLine(upperCircleX1, upperCircleY1, circleSize);
  }

  // 绘制对角线下方的圆
  for (let b = 0; b < numCircles - 1; b++) {
    let lowerCircleX = b * (circleSize * 0.75) + (circleSize * 0.15);
    let lowerCircleY = b * (circleSize * 0.80) + (circleSize * 1.5);
    drawConcentricCircles(lowerCircleX, lowerCircleY, circleSize);
    drawEllipsesAroundCircle(lowerCircleX, lowerCircleY, circleSize);
    drawSurroundingCircles(lowerCircleX, lowerCircleY, 55, numCircles, circleSize);
    if (b == 0 || b == 2 || b == 3){
    drawFilledSurroundingCircles(lowerCircleX, lowerCircleY, circleSize);
    }
    if (b == 1) {
      drawZigzagLines(lowerCircleX, lowerCircleY, circleSize);
    }
    drawExtendingLine(lowerCircleX, lowerCircleY, circleSize);
  }

  for (let c = 0; c < numCircles - 3; c++) {
    let lowerCircleX1 = c * (circleSize * 0.75) - (circleSize * 0.2);
    let lowerCircleY1 = c * (circleSize * 0.85) + (circleSize * 2.5);
    drawConcentricCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawEllipsesAroundCircle(lowerCircleX1, lowerCircleY1, circleSize);
    drawSurroundingCircles(lowerCircleX1, lowerCircleY1, 100, numCircles, circleSize);
    drawFilledSurroundingCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawExtendingLine(lowerCircleX1, lowerCircleY1, circleSize);
  }
}

//绘制椭圆形的方法
function drawEllipse(centerX, centerY, ellipseWidth, ellipseHeight, rotation) {
  push();
  translate(centerX, centerY);
  rotate(rotation);
  beginShape();
  for (let i = 0; i < 100; i++) {
    fill(randomColor());
    stroke(255, 117, 26);
    strokeWeight(2);
    let angle = TWO_PI * i / 100;
    let x = ellipseWidth * cos(angle);
    let y = ellipseHeight * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

//绘制椭圆形环绕圆形
function drawEllipsesAroundCircle(centerX, centerY, circleSize) {
  let numEllipses = 33;  // 椭圆的数量
  let ellipseWidth = circleSize / 19;  
  let ellipseHeight = circleSize / 40; 
  let radius = circleSize / 1.8;  // 椭圆到圆心的距离

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses;
    let ellipseCenterX = centerX + radius * cos(angle);
    let ellipseCenterY = centerY + radius * sin(angle);
    let rotation = angle + HALF_PI;  // 旋转椭圆使椭圆的长轴与圆的半径垂直
    drawEllipse(ellipseCenterX, ellipseCenterY, ellipseWidth, ellipseHeight, rotation);
  }
}

//绘制锯齿形线条的方法
function drawZigzagLines(centerX, centerY, circleSize) {
  let radius = circleSize / 2;
  let numZigzags = 80;
  let angleStep = 360 / numZigzags;

  push();
  stroke(255, 0, 0); 
  noFill();
  strokeWeight(2);

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

//绘制填充并环绕大圆形的内部小圆的方法
function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25; // 小圆的直径
  let radius = circleSize / 2 - smallCircleSize / 2 - 2; // 小圆中心到大圆中心的距离
  
  for (let i = 0; i < 5; i++) {
    for (angle = 0; angle < 360; angle += 10) {
      let rad = radians(angle);
      noStroke();
      let x = centerX + (radius - (i * 10)) * cos(rad);
      let y = centerY + (radius - (i * 10)) * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

//绘制环绕大圆的外部小圆的方法
function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15; // 小圆的直径
  let radius = circleSize / 2 + smallCircleSize / 2 + 2; // 小圆中心到大圆中心的距离

  for (let i = 0; i < numCircles; i++) {
    for (angle; angle < 360; angle += 72) {
      fill(randomColor());
      stroke(0, 0, 0);
      strokeWeight(4);
      let rad = radians(angle);
      let x = centerX + radius * cos(rad);
      let y = centerY + radius * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}
//绘制同轴圆形组合的方法
function drawConcentricCircles(x, y, size) {
  const layers = random(4, 10); // 随机层数
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0);
    strokeWeight(random(3));
    fill(randomColor()); // 使用随机颜色
    ellipse(x, y, currentSize, currentSize);
    currentSize *= 0.7; // 层级大小递减
  }
}

function drawExtendingLine(centerX, centerY, circleSize) {
  const HALF_PI = Math.PI / 2;
  let angle = random(-HALF_PI, HALF_PI); // 随机选择一个角度范围，这里选择 -π/2 到 π/2 之间
  let radius = circleSize / 1.6; // 半径为圆直径的一半

  let xEnd = centerX + radius * cos(angle);
  let yEnd = centerY + radius * sin(angle);

  let controlX = centerX + radius * 0.4 * cos(angle); // 控制点 x 坐标为起点与终点的中点
  let controlY = centerY + radius * 1 * sin(angle); // 控制点 y 坐标为圆心的 y 坐标

  stroke(255, 20, 147); // 粉色
  strokeWeight(4);

  // 绘制曲线，起点为圆心，终点为圆周上的一点，控制点为控制点的坐标
  noFill();
  beginShape();
  vertex(centerX, centerY);
  quadraticVertex(controlX, controlY, xEnd, yEnd);
  endShape();
}

//随机颜色
function randomColor() {
  return color(random(255), random(255), random(255));
}
