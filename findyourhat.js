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

function checkGameStatus() {
  // แพ้: เดินออกนอกแผนที่
  if (actor.x < 0 || actor.x >= GRID_SIZE || actor.y < 0 || actor.y >= GRID_SIZE) {
    return { over: true, message: "🚫 You went out of bounds! Game over." };
  }
 
  // แพ้: ตกหลุม
  const fellInHole = holes.some((h) => h.x === actor.x && h.y === actor.y);
  if (fellInHole) {
    return { over: true, message: "💀 You fell into a hole! Game over." };
  }
 
  // ชนะ: เจอหมวก
  if (actor.x === hat.x && actor.y === hat.y) {
    return { over: true, message: "🎉 You found the hat! You win!" };
  }
 
  return { over: false, message: "" };
}
 
async function handleCommand(command) {
  if (command === "w") {
    console.log(actor.moveUp());
  } else if (command === "s") {
    console.log(actor.moveDown());
  } else if (command === "a") {
    console.log(actor.moveLeft());
  } else if (command === "d") {
    console.log(actor.moveRight());
  } else {
    console.log("Please enter w, a, s, d, or q");
  }
}

async function askForCommand() {
  rl.question("Move (w/a/s/d, q to quit): ", async (answer) => {
    const command = answer.trim().toLowerCase();
 
    if (command === "q") {
      console.log("\n👋 Thanks for playing! Goodbye.");
      rl.close();
      return;
    }
 
    await handleCommand(command);
    displayMap();
 
    const status = checkGameStatus();
    if (status.over) {
      console.log(status.message);
      rl.close();
      return;
    }
 
    askForCommand();
  });
}
 
console.log("🎩 Find the hat! Avoid the holes and stay inside the field.");
displayMap();
askForCommand();