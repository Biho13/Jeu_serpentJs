let gameRunning = false;
let score = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;

function startGame() {
  gameRunning = true;
  score = 0;
  updateScore();
  resetGame();
  gameLoop();
}

function update() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = getRandomFoodPosition();
    score++;
    updateScore();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= canvas.width / boxSize ||
    head.y < 0 ||
    head.y >= canvas.height / boxSize
  ) {
    endGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00F";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
  });

  ctx.fillStyle = "#F00";
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function gameLoop() {
  if (gameRunning) {
    update();
    draw();
    setTimeout(gameLoop, 200);
  }
}

function endGame() {
  gameRunning = false;
  alert("Game Over! Your score is: " + score);
}

function updateScore() {
  document.getElementById("score").textContent = "Score: " + score;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = getRandomFoodPosition();
  direction = "right";
}

function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / boxSize)),
    y: Math.floor(Math.random() * (canvas.height / boxSize)),
  };
}

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});
