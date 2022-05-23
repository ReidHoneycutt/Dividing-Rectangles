//when you play it, try moving the mouse around and the rectangles divide in an interesting way. 

let W = window.innerWidth;
let H = window.innerHeight;
let rects = [];
let R;
let MAX_DEPTH = 7;


function setup() {
  createCanvas(W, H);
  background(0);
  R = new Rect(0,0, W, H, 0, 0);
}

function draw() {
  background(0);
  R.show();
  R.update();
}

function mouseClicked() {
  R.split();
}