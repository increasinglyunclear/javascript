// Random Walk 3D
// Kevin Walker 02 Jan 2025
// Based on Dan Shiffman's 2D walker class from <a href="https://natureofcode.com/">The Nature of Code</a>. 

let walkers = [];
let rotationY = 0;
let rotationX = 0;
let zoomLevel = 14;
let targetZoom = 14;
let zoomSpeed = 0.15;
let zoomStep = 0.8;
let zoomingIn = false;
let zoomingOut = false;

function setup() {
  console.log('Setting up...');
  createCanvas(windowWidth, windowHeight, WEBGL);
  perspective(PI/3.0, width/height, 0.00001, 5000);
  
  // Create multiple walkers
  for (let i = 0; i < 8; i++) {
    walkers.push(new Walker());
  }
  
  // Remove loading indicator
  let loading = document.getElementById('loading');
  loading.classList.add('fade');
  setTimeout(() => {
    loading.style.display = 'none';
  }, 500);
}

function draw() {
  background(0);
  
  // Handle continuous zooming
  if (zoomingIn) {
    targetZoom = targetZoom - zoomStep;
  }
  if (zoomingOut) {
    targetZoom = min(14, targetZoom + zoomStep);
  }
  
  // Smooth zoom interpolation
  zoomLevel = lerp(zoomLevel, targetZoom, zoomSpeed);
  
  // Calculate camera position based on mouse and zoom
  rotationY = map(mouseX, 0, width, PI, -PI);
  rotationX = map(mouseY, 0, height, PI, -PI);
  rotationX = constrain(rotationX, -PI/2, PI/2);
  
  let camDist = pow(1.5, zoomLevel);
  let camX = sin(rotationY) * cos(rotationX) * camDist;
  let camY = sin(rotationX) * camDist;
  let camZ = cos(rotationY) * cos(rotationX) * camDist;
  
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  
  // Basic lighting
  ambientLight(50);
  directionalLight(255, 255, 255, 0, 1, -1);
  
  // Update and draw all walkers
  for (let walker of walkers) {
    walker.step();
    walker.render();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    zoomingIn = true;
  } else if (keyCode === DOWN_ARROW) {
    zoomingOut = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    zoomingIn = false;
  } else if (keyCode === DOWN_ARROW) {
    zoomingOut = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 
