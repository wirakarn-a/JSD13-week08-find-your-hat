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
    this.symbol = "🐣";
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

// สุ่มตำแหน่งไม่ให้ hole/hat/actor ทับกัน
function getRandomPosition(usedPositions) {
  let x, y, key;
  do {
    x = Math.floor(Math.random() * GRID_SIZE);
    y = Math.floor(Math.random() * GRID_SIZE);
    key = `${x},${y}`;
  } while (usedPositions.has(key));
  usedPositions.add(key);
  return { x, y };
}

function setupGame() {
  const usedPositions = new Set();
 
  const actorStart = getRandomPosition(usedPositions);
  const actor = new Actor(actorStart.x, actorStart.y);
 
  const hat = getRandomPosition(usedPositions);
 
  const holes = [];
  for (let i = 0; i < NUM_HOLES; i++) {
    holes.push(getRandomPosition(usedPositions));
  }
 
  return { actor, hat, holes };
}
 
const { actor, hat, holes } = setupGame();
 
function displayMap() {
  console.log("");
  for (let row = 0; row < GRID_SIZE; row++) {
    let line = "";
    for (let col = 0; col < GRID_SIZE; col++) {
      if (actor.x === col && actor.y === row) {
        line += actor.symbol;
      } else if (hat.x === col && hat.y === row) {
        line += "🎩";
      } else if (holes.some((h) => h.x === col && h.y === row)) {
        line += "🕳️";
      } else {
        line += "⬜";
      }
    }
    console.log(line);
  }
  console.log("");
}
 