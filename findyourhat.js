import { createInterface } from "node:readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const GRID_SIZE = 5;
const NUM_HOLES = 3;

class Actor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.symbol = "🧑";
  }

  moveRight() {
    if (this.x < GRID_SIZE - 1) {
      this.x++;
      return "You walked right";
    }
    return "You are already at the edge of the field";
  }

  moveLeft() {
    if (this.x > 0) {
      this.x--;
      return "You walked left";
    }
    return "You are already at the edge of the field";
  }

  moveUp() {
    if (this.y > 0) {
      this.y--;
      return "You walked up";
    }
    return "You are already at the edge of the field";
  }

  moveDown() {
    if (this.y < GRID_SIZE - 1) {
      this.y++;
      return "You walked down";
    }
    return "You are already at the edge of the field";
  }
}