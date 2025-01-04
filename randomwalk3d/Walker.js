// Random Walk 3D
// Kevin Walker 02 Jan 2025
// Based on Dan Shiffman's 2D walker class from <a href="https://natureofcode.com/">The Nature of Code</a>. 

class Walker {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.trail = [];
    this.trail.push(createVector(this.x, this.y, this.z));
  }
  
  step() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.z += random(-2, 2);
    
    this.x = constrain(this.x, -200, 200);
    this.y = constrain(this.y, -200, 200);
    this.z = constrain(this.z, -200, 200);
    
    this.trail.push(createVector(this.x, this.y, this.z));
  }
  
  render() {
    // Draw trail with transparency
    stroke(255, 35);  // White with only 35/255 opacity
    strokeWeight(1);
    noFill();
    
    // Draw trail as continuous line
    beginShape();
    for (let p of this.trail) {
      vertex(p.x, p.y, p.z);
    }
    endShape();
    
    // Draw current position with slight glow
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(255, 35);
    sphere(0.01);
    pop();
  }
} 
