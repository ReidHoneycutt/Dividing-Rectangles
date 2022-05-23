class Rect {
  constructor(a, b, c, d, r, layer) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.q1 = null;
    this.q2 = null;
    this.q2 = null;
    this.q4 = null;
    this.contains = false;
    this.r = 5;
    this.layer = layer;
  }
  split() {
    if (!this.q1) {
      if (this.layer < MAX_DEPTH) {
        this.q1 = new Rect(this.a+this.c/2, this.b, this.c/2, this.d/2, this.r/2, this.layer+1)
        this.q2 = new Rect(this.a, this.b, this.c/2, this.d/2, this.r/2, this.layer+1);
        this.q3 = new Rect(this.a, this.b+this.d/2, this.c/2, this.d/2, this.r/2, this.layer+1);
        this.q4 = new Rect(this.a+this.c/2, this.b+this.d/2, this.c/2, this.d/2, this.r/2, this.layer+1);
      }
    } else {
      this.q1.split();
      this.q2.split();
      this.q3.split();
      this.q4.split();
    }
  }
  update() {
    this.check_for_cursor();
    if (this.contains) {
      if (!this.q1) {
        this.split();
      } else {
        this.q1.update();
        this.q2.update();
        this.q3.update();
        this.q4.update()
      }
    } else {
      this.q1 = null;
      this.q2 = null;
      this.q3 = null;
      this.q4 = null;
    } 
  }
  check_for_cursor() {
    if (this.a <= mouseX && mouseX < this.a+this.c) {
      if (this.b <= mouseY && mouseY < this.b+this.d) {
        this.contains = true;
      } else {
        this.contains = false;
      }
    } else {
      this.contains = false;
    }
  }
  show() {
    let D = Math.sqrt(W*W+H*H);
    let d = (mouseX, mouseY, this.a+this.c/2, this.b+this.d/2);
    colorMode(HSB, 1, 1, 1);
    fill(this.layer/MAX_DEPTH, 1-this.a/W, 1-this.b/H);
    if (this.q1) {
      this.q1.show();
      this.q2.show();
      this.q3.show();
      this.q4.show();
    } else {
      rect(this.a, this.b, this.c, this.d, this.r, this.r);
    }
    this.r += 0.125;
    this.a += (this.c-0.9994*this.c)/2;
    this.b += (this.d-0.9994*this.d)/2;
    this.c = 0.9994*this.c;
    this.d = 0.9994*this.d;
    
  }
}


//rect(30, 20, 55, 55, 20, 15, 10, 5);