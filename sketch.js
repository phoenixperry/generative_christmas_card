

let treeLevels = 5; // Number of levels in the tree
let treeWidth = 200; // Width of the base of the tree
let treeHeight = 300; // Total height of the tree
let treeColor;
let levelHeight;
// Add more animation functions as needed
let snowflakes = []; // array to hold snowflakes
let colorIndex = 0; // Index to keep track of the current color
let lastChangeTime = 0; // Time since the last color change
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; // Rainbow colors array

function setup() {
   treeWidth = width*.5 // Width of the base of the tree
   treeHeight = height*.3; // Total height of the tree
  createCanvas(windowWidth, windowHeight); // Full screen canvas
  fill(255);
  noStroke();
  treeColor = color(25, 200, 25); // Green color for the tree
  levelHeight = treeHeight / treeLevels; // Height of each level of the tree
  frameRate(30); // Set the frame rate to 30 frames per second
}

function draw() {
  treeWidth = width*.5
  treeHeight = height*.3; 
  background(25); // Set a dark background for contrast with the snowflakes

  // create a random number of snowflakes each frame (up to a maximum of 50)
  if (frameCount % 15 === 0 && snowflakes.length < 50) { // Every 15 frames, add a new snowflake
    snowflakes.push(new Snowflake(random(width), -10));
  }
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    snowflakes[i].update(); // update snowflake position
    snowflakes[i].display(); // draw snowflake
    
    // remove the snowflake if it's out of the canvas boundaries
    if (snowflakes[i].posY > height || snowflakes[i].posX < 0 || snowflakes[i].posX > width) {
      snowflakes.splice(i, 1);
    }
    
  }
  drawNetworkTree(width / 2, height / 2, 200, 300, 5);
}

// snowflake class
function Snowflake() {

  // initialize coordinates
  this.posX = random(0, width);
  this.posY = random(-50, 0);
  this.size = random(2, 8);

  this.update = function() {
    // snowflakes fall at different y speeds
    this.posY += pow(this.size, 0.5);

    // x position drifts slightly
    //this.posX += random(.7, -1)  ;
  };

  this.display = function() {
    noStroke();
    fill(255); // White color for the snowflake
    ellipse(this.posX, this.posY, this.size);
  };
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function drawNetworkTree(x, y, baseWidth, height, levels) {
  let points = [];
  stroke(255); // Set line color to white for contrast
  fill(colors[colorIndex]); // Set fill color to the current color in the array
  
  // Calculate the horizontal and vertical spacing between points
  let hSpacing = baseWidth / levels;
  let vSpacing = height / levels;
  
  // Generate the points for the tree
  for (let i = 0; i <= levels; i++) {
    for (let j = 0; j <= i; j++) {
      let curX = x - (i * hSpacing) / 2 + j * hSpacing;
      let curY = y - height / 2 + i * vSpacing;
      points.push({pos: createVector(curX, curY), color: colors[(colorIndex + i + j) % colors.length]});
      noStroke();
      fill(points[points.length - 1].color);
      ellipse(curX, curY, 8, 8); // Draw the point
    }
  }
  
  // Connect the points with lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = dist(points[i].pos.x, points[i].pos.y, points[j].pos.x, points[j].pos.y);
      // Connect points that are close enough to each other
      if (distance < hSpacing * 1.5) {
        // stroke(150);
        // //line(points[i].pos.x, points[i].pos.y, points[j].pos.x, points[j].pos.y);
      
      }
    }
  }
  
  // Update the color index based on the time interval
  if (millis() - lastChangeTime > 500) { // 0.25 seconds has passed
    colorIndex = (colorIndex + 1) % colors.length;
    lastChangeTime = millis();
  }
}
