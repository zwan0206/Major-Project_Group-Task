function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0, 85, 128);
  // The number of circles on the diagonal
  let numCircles = 5; 
  // The diameter of the circle
  let circleSize = sqrt(sq(width) + sq(height)) / numCircles;

  //Draw circles on the diagonal
  for (let i = 0; i < numCircles; i++) {
    let posX = (i + 1) * (circleSize * 0.5) + i * (circleSize * 0.25);
    let posY = posX;
    drawConcentricCircles(posX, posY, circleSize);
    drawEllipsesAroundCircle(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
    drawExtendingLine(posX, posY, circleSize);
  }

  // Draw circles above the diagonal
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

  // Draw circles below the diagonal
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

//Draw ellipses
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

//Draw ellipses to enclose circles
function drawEllipsesAroundCircle(centerX, centerY, circleSize) {
  let numEllipses = 33; 
  let ellipseWidth = circleSize / 19;  
  let ellipseHeight = circleSize / 40; 
  // The distance from the ellipse to the center of the circle
  let radius = circleSize / 1.8;

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses;
    let ellipseCenterX = centerX + radius * cos(angle);
    let ellipseCenterY = centerY + radius * sin(angle);
    // Rotating the ellipse makes the long axis of the ellipse perpendicular to the radius of the circle.
    let rotation = angle + HALF_PI; 
    drawEllipse(ellipseCenterX, ellipseCenterY, ellipseWidth, ellipseHeight, rotation);
  }
}

//Draw zigzag lines
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
    // Alternate between two radii for zigzag effect
    radius = i % 2 === 0 ? circleSize / 2 : circleSize / 4; // Alternate between two radii for zigzag effect
  }
  endShape(CLOSE);
  pop();
}

//Draw small circles inside circles
function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25;
  // The distance from the center of the minor circle to the center of the great circle
  let radius = circleSize / 2 - smallCircleSize / 2 - 2;
  
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

//Draw small circles around circles
function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15; 
  // The distance from the center of the minor circle to the center of the great circle
  let radius = circleSize / 2 + smallCircleSize / 2 + 2;

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
// Draw combinations of concentric circles
function drawConcentricCircles(x, y, size) {
  // Random number of layers
  const layers = random(4, 10);
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0);
    strokeWeight(random(3));
    // Use the random color function
    fill(randomColor());
    ellipse(x, y, currentSize, currentSize);
    // The level is decreasing in size
    currentSize *= 0.7; 
  }
}

// Draw extension lines based on the mouse position.
function drawExtendingLine(centerX, centerY, circleSize) {
  const HALF_PI = Math.PI / 2;
  // Randomly select an angle range, here between -π/2 and π/2
  let angle = random(-HALF_PI, HALF_PI); 
  let radius = circleSize / 1.6; 

  let xEnd = centerX + radius * cos(angle);
  let yEnd = centerY + radius * sin(angle);

  // The control point x-coordinate is the midpoint of the start and end points.
  let controlX = centerX + radius * 0.4 * cos(angle); 
  // The y-coordinate of the control point is the y-coordinate of the center of the circle.
  let controlY = centerY + radius * 1 * sin(angle);

  stroke(255, 20, 147);
  strokeWeight(4);

  // Draw a curve with the start point being the center of the circle, the end point being a point on the circumference, and the control point being the coordinates of the control point.
  noFill();
  beginShape();
  // The 'vertex()' function is a function used to define vertices, which is used to create and draw shapes, and here it is used to define the starting point of the extension line.
  vertex(centerX, centerY);
  // The 'quadraticVertex()' function is a function used to plot quadratic Bezier curves. A quadratic Bezier curve is defined by a starting point, a control point, and an end point. This function makes the curve bend smoothly between the start and end points by giving the coordinates of the control points. Here it is used to plot a quadratic Bezier curve that extends from the center of the circle to the circumference.
  quadraticVertex(controlX, controlY, xEnd, yEnd);
  endShape();
}

// Set a random color
function randomColor() {
  return color(random(255), random(255), random(255));
}
