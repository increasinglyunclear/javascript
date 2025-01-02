let walkers = [];
let rotationY = 0;
let rotationX = 0;
let zoomLevel = 14;
let targetZoom = 14;
let zoomSpeed = 0.15;
let lastTouchDistance = 0;

function setup() {
  console.log('Setting up mobile version...');
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
  
  // Smooth zoom interpolation
  zoomLevel = lerp(zoomLevel, targetZoom, zoomSpeed);
  
  // Use the same camera setup as the desktop version
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

function touchMoved() {
  if (touches.length === 2) {
    // Handle pinch to zoom
    let currentTouchDistance = dist(
      touches[0].x, touches[0].y,
      touches[1].x, touches[1].y
    );
    
    if (lastTouchDistance > 0) {
      let zoomDelta = (lastTouchDistance - currentTouchDistance) * 0.01;
      targetZoom = constrain(targetZoom + zoomDelta, 8, 14);
    }
    
    lastTouchDistance = currentTouchDistance;
  } 
  else if (touches.length === 1) {
    // Map touch position to rotation like we do with mouse
    rotationY = map(touches[0].x, 0, width, PI, -PI);
    rotationX = map(touches[0].y, 0, height, PI, -PI);
    rotationX = constrain(rotationX, -PI/2, PI/2);
  }
  
  return false;
}

function touchStarted() {
  if (touches.length === 2) {
    lastTouchDistance = dist(
      touches[0].x, touches[0].y,
      touches[1].x, touches[1].y
    );
  }
  return false;
}

function touchEnded() {
  if (touches.length < 2) {
    lastTouchDistance = 0;
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 