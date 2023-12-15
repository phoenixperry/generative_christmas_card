

let treeLevels = 9; // Number of levels in the tree
let treeWidth = 200; // Width of the base of the tree
let treeHeight = 300; // Total height of the tree
let treeColor;
let levelHeight;
// Add more animation functions as needed
let snowflakes = []; // array to hold snowflakes
let colorIndex = 0; // Index to keep track of the current color
let lastChangeTime = 0; // Time since the last color change

let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; // Rainbow colors array

let mouseOverTree = false;
let treeLights = []; // Array to hold the tree lights

function setup() {
   treeWidth = width*.5 // Width of the base of the tree
   treeHeight = height*.3; // Total height of the tree
  createCanvas(windowWidth, windowHeight); // Full screen canvas
  fill(255);
  noStroke();
  levelHeight = treeHeight / treeLevels; // Height of each level of the tree
  frameRate(30); // Set the frame rate to 30 frames per second
}

function draw() {
  treeWidth = width*.3
  treeHeight = height*.5; 
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



  // Draw the tree with the new dimensions
  drawNetworkTree(width / 2, height / 2, treeWidth, treeHeight, treeLevels);


}

function mousePressed() {
  
  if (mouseX > width / 2 - treeWidth / 2 && mouseX < width / 2 + treeWidth / 2 &&
      mouseY > height / 2 - treeHeight / 2 && mouseY < height / 2 + treeHeight / 2) {
    // Trigger the lights to fall
    for (let light of treeLights) {
      light.falling = true;
    }
  }
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
  
  
  // Update the color index based on the time interval
  if (millis() - lastChangeTime > 500) { // 0.25 seconds has passed
    colorIndex = (colorIndex + 1) % colors.length;
    lastChangeTime = millis();
  }
}
