let angle = 0; // Initialize angle variable for animation
let circlesDrawn = 0; // Track the number of circles drawn
let numCircles = 7; // 对角线上的圆的数量
let circleSize; //圆的直径
let circles = []; // Array to store circle positions and sizes

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  circleSize = (sqrt(sq(width) + sq(height)) / numCircles) * 0.8;
  frameRate(10);
  setupTimedEvents;
}

function draw() {
  background(0, 85, 128);

  // Dynamically calculate the number of rows and columns
  let numColumns = floor(width / circleSize);
  let numRows = floor(height / circleSize);

  // Draw a circle
  for (let i = 0; i < circlesDrawn; i++) {
    let posX = circles[i].x;
    let posY = circles[i].y;
    drawConcentricCircles(posX, posY, circleSize);
    drawEllipsesAroundCircle(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
    drawExtendingLine(posX, posY, circleSize);
  }

  // Draw current circle
  if (circlesDrawn < numRows * numColumns) {
    let row = floor(circlesDrawn / numColumns);
    let col = circlesDrawn % numColumns;
    let posX = col * circleSize + circleSize / 2;
    let posY = row * circleSize + circleSize / 2;
    drawConcentricCircles(posX, posY, circleSize);
    drawEllipsesAroundCircle(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
    drawExtendingLine(posX, posY, circleSize);
    circles.push({ x: posX, y: posY, size: circleSize });
    circlesDrawn++;
  }

  // If all circles are drawn, start animation
  if (circlesDrawn >= numRows * numColumns) {
    animate();
  }
}


//Method of drawing ovals
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

//Draw an oval around a circle
function drawEllipsesAroundCircle(centerX, centerY, circleSize) {
  let numEllipses = 33;  // Number of ovals
  let ellipseWidth = circleSize / 19;
  let ellipseHeight = circleSize / 40;
  let radius = circleSize / 1.8;  // The distance from the ellipse to the center of the circle

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses;
    let ellipseCenterX = centerX + radius * cos(angle);
    let ellipseCenterY = centerY + radius * sin(angle);
    let rotation = angle + HALF_PI;  // Rotate the ellipse so that its major axis is perpendicular to the radius of the circle
    drawEllipse(ellipseCenterX, ellipseCenterY, ellipseWidth, ellipseHeight, rotation);
  }
}

//A method of drawing zigzag lines
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

//Method of drawing a small inner circle that fills and surrounds a large circle
function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25; // The diameter of a small circle
  let radius = circleSize / 2 - smallCircleSize / 2 - 2; // The distance from the center of the small circle to the center of the big circle

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

//Method of drawing a small outer circle around a large circle
function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15; 
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
//Method of drawing a combination of coaxial circles
function drawConcentricCircles(x, y, size) {
  const layers = random(4, 10); // Random layer number
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0);
    strokeWeight(random(3));
    fill(randomColor()); // Use random colors
    ellipse(x, y, currentSize, currentSize);
    currentSize *= 0.7; // Descending hierarchy size
  }
}

function drawExtendingLine(centerX, centerY, circleSize) {
  const HALF_PI = Math.PI / 2;
  let angle = random(-HALF_PI, HALF_PI); // Choose an Angle range at random, here between -π/2 and π/2
  let radius = circleSize / 1.6; // The radius is half the diameter of the circle

  let xEnd = centerX + radius * cos(angle);
  let yEnd = centerY + radius * sin(angle);

  let controlX = centerX + radius * 0.4 * cos(angle); // The X-coordinate of the control point is the midpoint between the starting point and the ending point
  let controlY = centerY + radius * 1 * sin(angle); // The y coordinate of the control point is the y coordinate of the center of the circle

  stroke(255, 20, 147); 
  strokeWeight(4);

  // A curve is drawn, starting at the center of the circle, 
  // ending at a point on the circumference, and the control point is the coordinate of the control point
  noFill();
  beginShape();
  vertex(centerX, centerY);
  quadraticVertex(controlX, controlY, xEnd, yEnd);
  endShape();
}

function animate() {
  // Increment angle for time-based animation
  angle += 0.01;
  // Update the positions or attributes of the circles for animation
  for (let i = 0; i < circles.length; i++) {
    circles[i].x += cos(angle) * 2; // Example animation: move circles horizontally
    circles[i].y += sin(angle) * 2; // Example animation: move circles vertically
  }
  redraw(); // Redraw the canvas to reflect changes
}


// Set up timed events for animation
function setupTimedEvents() {
  setInterval(animate, 300); // Call the animate function every 100 milliseconds
}

//Random color
function randomColor() {
  return color(random(255), random(255), random(255));
}
