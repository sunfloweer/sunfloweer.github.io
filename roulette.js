//https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false); 

var x = 250;
var y = 300;
var sonne = false;
var mond = false;
var speed = 0;
var arrowx = 250;
var arrowxy = 300;
var randomX = 0;
var randomY = 0;
var randomnumber = -1;

function draw() {
  clear();
  background (30);
  board(x, y + 60, 1.1);
  sun(x + 60, y + 195, 1.3); //1
  sun(x + 305, y + 195, 1.3); //2
  moon(x + 94, y + 184, 1.2); //1
  moon(x + 344, y + 192, 1.27); //2
  buttonone(x + 140, y + 160, 1.45);
  buttontwo(x + 140, y + 160, 1.45);
  buttonthree(x + 140, y + 155, 1.45);
  buttonfour(x, y, 1.0);

  if (arrowx < x || arrowx > x + 370) {
    speed = speed * -1;
  }
  arrow(arrowx - 15, y - 32, 1.2);
  arrowx = arrowx + speed; // arrow bewegung

  if (sonne === true) {
    mond = false;
    noFill();
    stroke(140, 160, 140);
    strokeWeight(3);
    rect(x - 208, y - 246, 58, 58, 70); //button 1 geklickt
    if (randomnumber === 0) {
      arrowx = 260;
    } else if (randomnumber === 1) {
      arrowx = 380;
    } else if (randomnumber === 2) {
      arrowx = 505;
    } else if (randomnumber === 3) {
      arrowx = 625;
    }
  }

  if (mond === true) {
    sonne = false;
    noFill();
    stroke(140, 160, 140);
    strokeWeight(3);
    rect(x - 136, y - 246, 58, 58, 70); //button 2 geklickt

    if (randomnumber === 0) {
      arrowx = 260;
    } else if (randomnumber === 1) {
      arrowx = 380;
    } else if (randomnumber === 2) {
      arrowx = 505;
    } else if (randomnumber === 3) {
      arrowx = 625;
    } // felder 1-4 auswahl
    //console.log (randomnumber);
  }

  result();
}

function mousePressed() {
  if (
    mouseX >= x + 225 &&
    mouseX <= x + 275 &&
    mouseY >= y + 215 &&
    mouseY <= y + 270
  ) {
    randomnumber = Math.floor(random(0, 4));
    speed = 0; //random auswahl (button 4)
  }

  if (
    mouseX >= x - 280 &&
    mouseX <= x - 160 &&
    mouseY >= y - 250 &&
    mouseY <= y - 190
  ) {
    sonne = true;
  } //button 1

  if (
    mouseX >= x - 150 &&
    mouseX <= x - 75 &&
    mouseY >= y - 250 &&
    mouseY <= y - 190
  ) {
    mond = true;
  } //button 2

  if (
    mouseX >= x - 50 &&
    mouseX <= x + 10 &&
    mouseY >= y - 265 &&
    mouseY <= y - 200
  ) {
    speed = 18; //button 3 geklickt (arrow start)
  }
}

function board(x, y, scale) {
  noStroke();
  fill("beige");
  rect(x - 190 * scale, y - 125 * scale, 440 * scale, 210 * scale); //körper
  stroke("black");
  strokeWeight(1 * scale);
  fill("black");

  line(x - 80 * scale, y - 125 * scale, x - 80 * scale, y + 85 * scale); //vertikale linien
  line(x + 30 * scale, y - 125 * scale, x + 30 * scale, y + 85 * scale);
  line(x + 140 * scale, y - 125 * scale, x + 140 * scale, y + 85 * scale); //vertikale linien
}

function sun(x, y, scale) {
  fill("black");
  ellipse(x - 163 * scale, y - 124 * scale, 12 * scale); //kreis
  line(x - 155 * scale, y - 132 * scale, x - 143 * scale, y - 143 * scale); //strahlen
  line(x - 163.5 * scale, y - 135 * scale, x - 163.5 * scale, y - 148 * scale);
  line(x - 172 * scale, y - 132 * scale, x - 183 * scale, y - 143 * scale);
  line(x - 154 * scale, y - 116.5 * scale, x - 144 * scale, y - 107 * scale);
  line(
    x - 163.5 * scale,
    y - 103.5 * scale,
    x - 163.5 * scale,
    y - 114 * scale
  );
  line(x - 172 * scale, y - 117 * scale, x - 181 * scale, y - 106 * scale); //strahlen
  line(x - 152 * scale, y - 125 * scale, x - 140 * scale, y - 125 * scale);
  line(x - 175 * scale, y - 125 * scale, x - 186 * scale, y - 125 * scale); //strahlen
}

function moon(x, y, scale) {
  fill("black");
  ellipse(x - 106 * scale, y - 128 * scale, 40 * scale); //mond
  noStroke();
  fill("beige");
  ellipse(x - 117 * scale, y - 135 * scale, 40 * scale); //überlappung mond
}

function buttonone(x, y, scale) {
  fill("beige");
  ellipse(x - 220 * scale, y - 260 * scale, 40 * scale); //button 1
  fill("black");
  stroke("black");
  sun(x - 139 * scale, y - 198 * scale, 0.5 * scale); //button sonne
}

function buttontwo(x, y, scale) {
  fill("beige");
  ellipse(x - 170 * scale, y - 260 * scale, 40 * scale); //button 2
  moon(x - 119 * scale, y - 196 * scale, 0.5 * scale); //button mond
}

function buttonthree(x, y, scale) {
  fill(140, 160, 140);
  ellipse(x - 110 * scale, y - 270 * scale, 40 * scale); //button 3
  fill(190, 210, 190);
  ellipse(x - 110 * scale, y - 270 * scale, 35 * scale); //highlight button 3
  noStroke();
  fill(210, 230, 210);
  rect(x - 240 * scale, y - 295 * scale, 90 * scale, 10 * scale); //rechteck für text
  fill("black");
  textFont("times new roman");
  textSize(11);
  text("auf was setzt du?", x - 224 * scale, y - 287.6 * scale); //auf mond/sonne "setzen" text
  textFont("didot");
  textStyle("bold");
  textSize(14.5 * scale);
  text("start", x - 125 * scale, y - 266 * scale, 25 * scale); //button start
}

function buttonfour(x, y, scale) {
  fill(150, 70, 70);
  ellipse(x + 250, y + 240, 50); // dunkle umrandung
  fill(180, 100, 100);
  ellipse(x + 250, y + 240, 30); // highlight button
  fill(300, 230, 230);
  textSize(15);
  text("random stop:", x + 204, y + 210);
}

function arrow(arrowx, arrowy, scale) {
  fill(90);
  triangle(
    arrowx - 120 * scale,
    arrowy + 115 * scale,
    arrowx - 130 * scale,
    arrowy + 155 * scale,
    arrowx - 110 * scale,
    arrowy + 155 * scale
  ); // dunkle umrandung
  fill(140, 140, 140);
  triangle(
    arrowx - 120 * scale,
    arrowy + 125 * scale,
    arrowx - 128.5 * scale,
    arrowy + 155 * scale,
    arrowx - 111 * scale,
    arrowy + 155 * scale
  ); // hellere umrandung
  fill(180, 180, 180);
  triangle(
    arrowx - 120 * scale,
    arrowy + 135 * scale,
    arrowx - 125 * scale,
    arrowy + 154.5 * scale,
    arrowx - 114 * scale,
    arrowy + 154.5 * scale
  ); // hellste stelle des pfeils
}

function result() {
  if (
    (sonne == true && randomnumber === 0) ||
    (sonne == true && randomnumber === 2) ||
    (mond == true && randomnumber === 1) ||
    (mond == true && randomnumber === 3)
  ) {
    stroke(140, 160, 140);
    fill("white");
    rect(x + 100, y - 235, 150, 45);
    noStroke();
    fill("black");
    textSize(20);
    text("you wiiin!", x + 129, y - 208);
  } else if (
    (sonne == false && randomnumber === 0) ||
    (sonne == false && randomnumber === 2) ||
    (mond == false && randomnumber === 1) ||
    (mond == false && randomnumber === 3)
  ) {
    stroke(140, 160, 140);
    fill("white");
    rect(x + 100, y - 235, 150, 45);
    noStroke();
    fill("black");
    textSize(20);
    text("you loseee!", x + 123, y - 208); // sonne - win lose
  }
}
