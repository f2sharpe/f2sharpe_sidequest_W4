/*
Platform.js
*/

class Platform {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;
  }

  draw(col) {
    fill(col);
    rect(this.x, this.y, this.w, this.h);
  }
}
