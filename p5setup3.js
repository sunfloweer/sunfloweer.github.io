function setup() {
    var p5canvas=createCanvas(570,300);
    p5canvas.parent ("p5canvas");
    frameRate(30);
  }
  
  window.addEventListener("resize", function() {
    resizeCanvas(windowWidth, windowHeight);
    clear();
  });
  
  new p5();
  var width = windowWidth;
  var height = windowHeight;
  