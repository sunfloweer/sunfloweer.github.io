createCanvas(590, 580);
//https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false); 


background(20);
let x = 200;
let y = 200;
let lx = 150;
let ly = 180;
let speed = 0.03;
let start = false;
let fuel = 130; 
let lunar = false;
let explosion = false;

function draw() {
  clear();
  background(20);
  noStroke();
  //Funktionen:
  stars(x, y, 1.0);
  stars(x + 450, y + 280, 1.0);
  stars(x + 30, y + 510, 1.0);
  stars(x + 690, y + 510, 1.0);
  stars(x + 590, y + 440, 1.1);
  stars(x + 580, y + 340, 1.0);
  stars(x + 740, y + 390, 1.0);
  stars(x + 200, y + 120, 1.0);
  stars(x + 120, y + 400, 1.0);
  stars(x + 340, y + 400, 1.0);
  stars(x + 300, y + 200, 1.0);
  stars(x + 180, y + 40, 1.0);
  stars(x + 160, y + 6 + 200, 1.1);
  stars(x + 330, y + 60, 1.0);
  stars(x + 130, y + 300, 1.0);
  stars(x + 390, y + 120, 1.0);
  stars(x + 340, y + 300, 1.1);
  stars(x + 480, y + 140, 1.0);
  stars(x + 550, y + 50, 1.0);
  stars(x + 40, y + 140, 1.0);
  stars(x + 710, y + 150, 1.0);
  stars(x + 30, y + 300, 1.2);
  stars(x + 560, y + 200, 1.0);
  stars(x + 670, y + 40, 1.0);
  stars(x + 730, y + 290, 1.0);
  moon(x - 20, y, 1.0);
  board(x, y, 1.0);
  begin(x, y, 1.0);
  reset(x, y, 1.0);
  help(x, y + 30, 1.0);

  if (
    mouseIsPressed === true &&
    mouseX >= x + 298 &&
    mouseY >= y - 52 &&
    mouseX <= x + 367 &&
    mouseY <= y - 18
  ) {
    box(x, y + 30, 1.0);
  } //Hilfekasten

  if (speed <= 1.31 && fuel >= 1) {
    lunar = true;
  } //Lunar Lander verschwindet

  if (lunar === true) {
    lander(lx, ly, 1.0);
  } //Lunar Lander

  if (explosion === true) {
    destruction(lx + 29.5, ly - 15, 1.3);
    lunar = false;
  } //Explosion

  //Start
  if (
    mouseIsPressed === true &&
    mouseX >= x + 298 &&
    mouseY >= y - 160 &&
    mouseX <= x + 367 &&
    mouseY <= y - 125
  ) {
    start = true;
    fuel = 130;
  }

  if (start === true) {
    lx = lx + speed * 0.3;
    ly = ly + speed;
    speed = speed + 0.02;
  }

  // Reset
  if (
    mouseIsPressed === true &&
    mouseX >= x + 298 &&
    mouseY >= y - 122 &&
    mouseX <= x + 367 &&
    mouseY <= y - 88
  ) {
    lx = 150;
    ly = 180;
    fuel = 130;
    speed = 0.03;
  }

  //Keys
  if (keyIsDown(38)) {
    speed = speed - 0.05;
    fuel -= 1;
    flames(lx, ly, 1.0); // Pfeil-hoch
  }

  if (keyIsDown(40)) {
    ly = ly + 1; // Pfeil-runter
  }

  if (keyIsDown(39)) {
    lx = lx + 1; // Pfeil-rechts
  }

  if (keyIsDown(37)) {
    lx = lx - 1; //Pfeil-links
  }

  // Ergebnis
  if (
    (speed > 1.31 && lx >= 210 && lx <= 290 && ly >= 428) ||
    (speed > 1.31 && lx >= 340 && lx <= 440 && ly >= 385) ||
    (speed > 1.31 && lx >= 480 && lx <= 580 && ly >= 422) ||
    fuel <= 0
  ) {
    // 3 Plattformen
    fuel = 0;
    lunar = false;
    explosion = true;
    textFont("times new roman");
    textSize(80);
    text("D E A T H", 120, 250);
  } // Verloren (Plattformen)

  if (
    (lx >= 126 && lx <= 187 && ly >= 435 && ly <= 465) /*Bereich1*/ ||
    (lx >= 318 && lx <= 321 && ly >= 390 && ly <= 430) /*Bereich2*/ ||
    (lx === 461 && ly >= 390 && ly <= 435) /*Bereich3*/ ||
    (lx >= 603 && lx <= 664 && ly >= 432 && ly <= 458) /*Bereich4*/ ||
    fuel <= 0
  ) {
    fuel = 0;
    lunar = false;
    explosion = true;
    textFont("times new roman");
    textSize(80);
    text("D E A T H", 120, 250);
  } // Verloren (Mond allgemein)

  if (
    (speed <= 1.3 && lx >= 210 && lx <= 290 && ly >= 428) ||
    (speed <= 1.3 && lx >= 340 && lx <= 440 && ly >= 385) ||
    (speed <= 1.3 && lx >= 480 && lx <= 580 && ly >= 422)
  ) {
    // 3 Plattformen
    fill(160);
    rect(x - 100, y - 10, 370, 110);
    fill(30);
    rect(x - 98, y - 8, 366, 106);
    fill(210);
    textFont("times new roman");
    textSize(60);
    text("safely landed.", 120, 250);
    fill(190);
    textSize(20);
    text("- good job! -", 282, 275);
  } // Gewonnen

  if (
    (speed <= 1.41 && lx >= 210 && lx <= 290 && ly >= 428) ||
    (speed <= 1.41 && lx >= 340 && lx <= 440 && ly >= 385) ||
    (speed <= 17 && lx >= 480 && lx <= 580 && ly >= 422) ||
    (speed > 1.71 && lx >= 210 && lx <= 290 && ly >= 428) ||
    (speed > 1.71 && lx >= 340 && lx <= 440 && ly >= 385) ||
    (speed > 1.41 && lx >= 480 && lx <= 580 && ly >= 422) ||
    fuel <= 0
  ) {
    start = false;
    return;
  } //Lunar Lander Stoppt
}

function moon(x, y, scale) {
  fill(90);
  ellipse(x + 120 * scale, y + 465 * scale, 790 * scale, 500 * scale); //Mond

  fill(75);
  ellipse(x + 20 * scale, y + 280 * scale, 3 * scale); //Mond-Punkte
  ellipse(x + 10 * scale, y + 310 * scale, 2 * scale);
  ellipse(x - 20 * scale, y + 260 * scale, 3 * scale);
  ellipse(x + 30 * scale, y + 290 * scale, 6 * scale);
  ellipse(x + 70 * scale, y + 360 * scale, 5 * scale);
  ellipse(x + 80 * scale, y + 290 * scale, 1 * scale);
  ellipse(x + 50 * scale, y + 320 * scale, 3 * scale);
  ellipse(x + 0 * scale, y + 350 * scale, 3 * scale);
  ellipse(x + 100 * scale, y + 280 * scale, 4 * scale);
  ellipse(x + 150 * scale, y + 310 * scale, 3 * scale);
  ellipse(x + 180 * scale, y + 260 * scale, 2 * scale);
  ellipse(x + 230 * scale, y + 290 * scale, 3 * scale);
  ellipse(x + 270 * scale, y + 360 * scale, 1 * scale);
  ellipse(x + 180 * scale, y + 290 * scale, 3 * scale);
  ellipse(x + 250 * scale, y + 320 * scale, 2 * scale);
  ellipse(x + 200 * scale, y + 330 * scale, 3 * scale); //Mond-Punkte

  fill(70);
  ellipse(x - 30 * scale, y + 278 * scale, 85 * scale, 27 * scale); //1. Krater-Schatten
  ellipse(x + 110 * scale, y + 233 * scale, 103 * scale, 27 * scale); //2. Krater-Schatten
  ellipse(x + 250 * scale, y + 269 * scale, 100 * scale, 26 * scale); //3. Krater-Schatten
  fill(140);
  ellipse(x - 30 * scale, y + 270 * scale, 80 * scale, 21 * scale); //1. Krater-Umrandung
  ellipse(x + 110 * scale, y + 225 * scale, 99 * scale, 22 * scale); //2. Krater-Umrandung
  ellipse(x + 250 * scale, y + 260 * scale, 97 * scale, 23 * scale); //3. Krater-Umrandung
  fill(40);
  ellipse(x - 30 * scale, y + 270 * scale, 70 * scale, 18 * scale); //1. Krater
  ellipse(x + 110 * scale, y + 225 * scale, 90 * scale, 20 * scale); //2. Krater
  ellipse(x + 250 * scale, y + 260 * scale, 90 * scale, 20 * scale); //3. Krater
  fill(99);
  ellipse(x + 80 * scale, y + 280 * scale, 80 * scale, 22 * scale); //Krater-Umrandung
  ellipse(x - 50 * scale, y + 345 * scale, 90 * scale, 27 * scale); //Krater-Umrandung
  ellipse(x + 290 * scale, y + 350 * scale, 80 * scale, 22 * scale); //Krater-Umrandung
  ellipse(x + 130 * scale, y + 330 * scale, 80 * scale, 22 * scale); //Krater-Umrandung
  ellipse(x + 210 * scale, y + 310 * scale, 50 * scale, 12 * scale); //weiterer Krater
  ellipse(x - 110 * scale, y + 310 * scale, 80 * scale, 22 * scale); //Krater-Umrandung
  ellipse(x + 345 * scale, y + 310 * scale, 80 * scale, 22 * scale); //Krater-Umrandung
  fill(80);
  ellipse(x + 80 * scale, y + 280 * scale, 70 * scale, 20 * scale); //weiterer Krater
  ellipse(x - 50 * scale, y + 345 * scale, 80 * scale, 25 * scale); //weiterer Krater
  ellipse(x + 290 * scale, y + 350 * scale, 70 * scale, 20 * scale); //weiterer Krater
  ellipse(x + 130 * scale, y + 330 * scale, 70 * scale, 20 * scale); //weiterer Krater
  ellipse(x + 210 * scale, y + 310 * scale, 40 * scale, 10 * scale); //weiterer Krater
  ellipse(x - 110 * scale, y + 310 * scale, 70 * scale, 20 * scale); //weiterer Krater
  ellipse(x + 345 * scale, y + 310 * scale, 70 * scale, 20 * scale); //weiterer Krater
}

function stars(x, y, scale) {
  fill("beige");
  ellipse(x - 100 * scale, y - 180 * scale, 2 * scale);
  ellipse(x - 150 * scale, y - 210 * scale, 1 * scale);
  ellipse(x - 180 * scale, y - 160 * scale, 2 * scale);
  ellipse(x - 230 * scale, y - 190 * scale, 2 * scale);
  ellipse(x - 270 * scale, y - 160 * scale, 1 * scale);
  ellipse(x - 180 * scale, y - 190 * scale, 1 * scale);
  ellipse(x - 250 * scale, y - 220 * scale, 1 * scale);
  ellipse(x - 200 * scale, y - 230 * scale, 1 * scale);
}

function board(x, y, scale) {
  fill(60);
  rect(x - 175 * scale, y - 130 * scale, 120 * scale, 65 * scale); //Hintergrund
  fill(160);
  textSize(15);
  textFont("times new roman");
  text("f u e l :", x - 168 * scale, y - 114 * scale); //Fuel-Text
  textSize(18);
  /*text("- ", x - 143 * scale, y - 85 * scale); //-
  text("- ", x - 100 * scale, y - 85 * scale); //- */
  textSize(19);
  fill(210);
  text(fuel, x - 115 * scale, y - 85 * scale); //Fuel-Count
}

function lander(lx, ly, scale) {
  noStroke();
  fill(190);
  triangle(
    lx - 100 * scale,
    ly + 0 * scale,
    lx - 120 * scale,
    ly + 40 * scale,
    lx - 80 * scale,
    ly + 40 * scale
  );
  fill(30);
  triangle(
    lx - 100 * scale,
    ly + 5 * scale,
    lx - 117 * scale,
    ly + 38 * scale,
    lx - 84 * scale,
    ly + 38 * scale
  );
}

function flames(lx, ly, scale) {
  fill("white");
  triangle(
    lx - 115 * scale,
    ly + 45 * scale,
    lx - 111 * scale,
    ly + 65 * scale,
    lx - 108 * scale,
    ly + 45 * scale
  ); //1.
  triangle(
    lx - 105 * scale,
    ly + 45 * scale,
    lx - 100 * scale,
    ly + 80 * scale,
    lx - 97 * scale,
    ly + 45 * scale
  ); //2.
  triangle(
    lx - 94 * scale,
    ly + 45 * scale,
    lx - 90 * scale,
    ly + 66 * scale,
    lx - 87 * scale,
    ly + 45 * scale
  ); //2.
}

function begin(x, y, scale) {
  fill(150);
  rect(x + 298 * scale, y - 162 * scale, 69 * scale, 34 * scale);
  fill("white");
  rect(x + 300 * scale, y - 160 * scale, 65 * scale, 30 * scale);
  fill(120);
  textFont("times new roman");
  textSize(20);
  text("start", x + 314 * scale, y - 140 * scale);
}

function reset(x, y, scale) {
  fill(150);
  rect(x + 298 * scale, y - 122 * scale, 69 * scale, 34 * scale);
  fill("white");
  rect(x + 300 * scale, y - 120 * scale, 65 * scale, 30 * scale);
  fill(120);
  textFont("times new roman");
  textSize(20);
  text("reset", x + 314 * scale, y - 100 * scale);
}

function help(x, y, scale) {
  fill(150);
  rect(x + 298 * scale, y - 82 * scale, 69 * scale, 34 * scale); //Rahmen
  fill(30);
  rect(x + 300 * scale, y - 80 * scale, 65 * scale, 30 * scale); //Feld
  fill(190);
  textFont("times new roman");
  textSize(15);
  text("help", x + 319 * scale, y - 61 * scale);
}

//Hilfebox
function box(x, y, scale) {
  fill(210);
  rect(x + 9 * scale, y - 81 * scale, 252 * scale, 152 * scale); //Umrandung
  triangle(x + 255, y - 75, x + 259, y - 50, x + 293, y - 62); //Umrandung
  fill(90);
  rect(x + 10 * scale, y - 80 * scale, 250 * scale, 150 * scale); //Kasten
  triangle(x + 259, y - 72, x + 259, y - 52, x + 290, y - 62); //Sprechblase Dreieck
  fill(210);
  text("click 'START' to start the game", x + 40, y - 55);
  text("press ' ← ' or ' → ' on keyboard to move ", x + 15, y - 32);
  text("press ' ↑ ' to use fuel for safe landing ", x + 24, y - 9);
  text(" ------ ", x + 116, y + 11);
  text("if fuel is used up OR the 3 platforms", x + 24, y + 34);
  text("are missed - game is over.", x + 60, y + 53);
}

function destruction(lx, ly, scale) {
  fill(100, 40, 20);
  rect(lx - 102 * scale, ly - 0 * scale, 5 * scale, 40 * scale); //Explosion unten
  triangle(
    lx - 100 * scale,
    ly + 40 * scale,
    lx - 110 * scale,
    ly - 0 * scale,
    lx - 90 * scale,
    ly - 0 * scale
  ); //Explosion unten
  fill(90, 30, 20);
  rect(lx - 106 * scale, ly - 3 * scale, 12 * scale, 20 * scale); //Schatten
  fill(115, 55, 35);
  rect(lx - 102 * scale, ly + 30 * scale, 5 * scale, 10 * scale); //Helle Stelle unten
  fill(315, 90, 90);
  ellipse(lx - 100 * scale, ly + 5 * scale, 35 * scale, 17 * scale); //Dunkelste Farbe Explosion oben
  fill(315, 210, 120);
  ellipse(lx - 100 * scale, ly + 3 * scale, 33 * scale, 13 * scale); // Hellere Farbe Explosion oben
  fill("white");
  ellipse(lx - 100 * scale, ly + 1 * scale, 30 * scale, 7 * scale); //Hellste Farbe Explosion oben
  explosion = false;
}