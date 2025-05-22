// Use p5 instance mode instead of global mode
const sketch = (p) => {
  let tennisBall = {
    x: 50,
    y: 450,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    speed: 5,
    size: 20,
    angle: p.radians(45), // Use p. prefix for p5 functions
    spin: 30,
    mass: 1,
    bounceFactor: 0.6,
    bouncex: 0,
    bouncey: 0,
    trail: []
  };

  let restart = false;
  let clicked = false;

  p.setup = function() {
    p.createCanvas(800, 600);
    p.frameRate(60);
    p.angleMode(p.DEGREES);
    clicked = false;
  };

  p.draw = function() {
    p.background(110, 136, 45);

    // Draw net
    p.stroke(255, 255, 255);
    p.line(p.width / 2, 0, p.width / 2, p.height);

    // Draw baseline
    p.stroke(255, 255, 255);
    p.line(p.width / 2, p.height / 2, p.width / 2, p.height);

    // Draw ball
    if (!clicked) {
      // Display text for user to start simulation
      p.textSize(24);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("Click to Start Simulation", p.width / 2, p.height / 2);
    } else {
      p.stroke(255);
      p.fill(255, 215, 0);
      p.ellipse(tennisBall.x, tennisBall.y, tennisBall.size);

      // Move tennis ball
      tennisBall.vy += tennisBall.ay;
      tennisBall.vx += tennisBall.ax;
      tennisBall.y += tennisBall.vy;
      tennisBall.x += tennisBall.vx;

      // Apply drag
      tennisBall.ax = -0.1 * tennisBall.vx;
      tennisBall.ay = -0.1 * tennisBall.vy;

      // Add Magnus force (topspin effect)
      tennisBall.ax += 0.01 * tennisBall.spin;

      // Bounce physics
      if (tennisBall.y > p.height - tennisBall.size / 2) {
        tennisBall.vy *= tennisBall.bounceFactor;
        tennisBall.y = p.height - tennisBall.size / 2;
        tennisBall.vx = tennisBall.bouncex;
        tennisBall.bouncex = 0;
      }

      // In bounds
      if (tennisBall.x < p.width / 2) {
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0, 128, 0);
        p.text("IN", p.width / 2, p.height / 2);
      } else {
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(255, 0, 0);
        p.text("OUT", p.width / 2, p.height / 2);
      }

      // Check for restart
      if (restart) {
        tennisBall.x = 50;
        tennisBall.y = 450;
        tennisBall.vx = 0;
        tennisBall.vy = 0;
        tennisBall.ax = 0;
        tennisBall.ay = 0;
        tennisBall.speed = 5;
        tennisBall.angle = p.radians(45);
        tennisBall.spin = 10;
        tennisBall.mass = 1;
        tennisBall.bounceFactor = 0.6;
        tennisBall.bouncex = 0;
        tennisBall.trail = [];
        restart = false;
      }
    }
  };

  // To detect mouse click to start simulation
  p.mousePressed = function() {
    clicked = true;
    tennisBall.vx = p.cos(tennisBall.angle) * tennisBall.speed;
    tennisBall.vy = p.sin(tennisBall.angle) * tennisBall.speed;
    tennisBall.trail = [];
  };
};

// Create a new p5 instance with the sketch
new p5(sketch);
