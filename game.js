// Game constructor
function Game(canvasId) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');

  // Game variables
  var bubbleRadius = 25;
  var bubbleSpeed = 2;
  var bubbleColor = '#0095DD';
  var shooterWidth = 60;
  var shooterHeight = 20;
  var shooterColor = '#0095DD';
  var bulletRadius = 5;
  var bulletSpeed = 5;
  var bulletColor = '#0095DD';
  var maxBubbles = 10;
  var bubbleRows = 5;
  var bubbleCols = 10;
  var bubblePadding = 10;
  var bubbleOffsetTop = 30;
  var bubbleOffsetLeft = 30;

  var bubbles = createBubbles();
  var shooter = createShooter();
  var bullets = [];
  var score = 0;
  var lives = 3;
  var gamePaused = false;
  var gameEnded = false;

  // Create bubbles
  function createBubbles() {
    var bubbleArr = [];

    for (var row = 0; row < bubbleRows; row++) {
      bubbleArr[row] = [];
      for (var col = 0; col < bubbleCols; col++) {
        var x = col * (bubbleRadius * 2 + bubblePadding) + bubbleOffsetLeft;
        var y = row * (bubbleRadius * 2 + bubblePadding) + bubbleOffsetTop;
        bubbleArr[row][col] = { x: x, y: y, visible: true };
      }
    }

    return bubbleArr;
  }

  // Create shooter
  function createShooter() {
    var x = canvas.width / 2 - shooterWidth / 2;
    var y = canvas.height - shooterHeight;
    return { x: x, y: y };
  }

  // Key event handlers
  function keyDownHandler(event) {
    if (event.keyCode === 32) {
      shoot();
    } else if (event.keyCode === 37) {
      shooter.x -= bubbleSpeed;
    } else if (event.keyCode === 39) {
      shooter.x += bubbleSpeed;
    }
  }

  function keyUpHandler(event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      shooter.xSpeed = 0;
    }
  }

  // Shoot a bullet
  function shoot() {
    var x = shooter.x + shooterWidth / 2;
    var y = shooter.y;
    bullets.push({ x: x, y: y });
  }

  // Update the game state
  function update() {
    if (gamePaused || gameEnded) return;

    moveBullets();
    checkCollision();
    moveBubbles();
    checkGameOver();
  }

  // Move the bullets
  function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].y -= bulletSpeed;
    }

    // Remove bullets that are out of bounds
    bullets = bullets.filter(function (bullet) {
      return bullet.y > 0;
    });
  }

  // Check collision between bullets and bubbles
  function checkCollision() {
    for (var i = 0; i < bullets.length; i++) {
      for (var row = 0; row < bubbleRows; row++) {
        for (var col = 0; col < bubbleCols; col++) {
          var bubble = bubbles[row][col];
          if (bubble.visible) {
            if (
              bullets[i].x > bubble.x &&
              bullets[i].x < bubble.x + bubbleRadius * 2 &&
              bullets[i].y > bubble.y &&
              bullets[i].y < bubble.y + bubbleRadius * 2
            ) {
              bullets.splice(i, 1);
              bubble.visible = false;
              score++;
            }
          }
        }
      }
    }
  }

  // Move the bubbles
  function moveBubbles() {
    for (var row = 0; row < bubbleRows; row++) {
      for (var col = 0; col < bubbleCols; col++) {
        var bubble = bubbles[row][col];
        bubble.x += bubbleSpeed;

        // Reverse bubble direction if hitting canvas edges
        if (
          bubble.x < bubbleRadius ||
          bubble.x > canvas.width - bubbleRadius * 2
        ) {
          bubbleSpeed *= -1;
          bubble.y += bubbleRadius * 2;
        }
      }
    }
  }

  // Check if the game is over
  function checkGameOver() {
    if (lives === 0) {
      gameEnded = true;
    }
  }

  // Render the game
  function render() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bubbles
    for (var row = 0; row < bubbleRows; row++) {
      for (var col = 0; col < bubbleCols; col++) {
        var bubble = bubbles[row][col];
        if (bubble.visible) {
          drawBubble(bubble.x, bubble.y);
        }
      }
    }

    // Draw shooter
    drawShooter(shooter.x, shooter.y);

    // Draw bullets
    bullets.forEach(function (bullet) {
      drawBullet(bullet.x, bullet.y);
    });

    // Draw score
    drawScore();

    // Draw lives
    drawLives();

    // Draw game over screen if game ended
    if (gameEnded) {
      drawGameOver();
    }
  }

  // Draw a bubble
  function drawBubble(x, y) {
    context.beginPath();
    context.arc(x, y, bubbleRadius, 0, Math.PI * 2);
    context.fillStyle = bubbleColor;
    context.fill();
    context.closePath();
  }

  // Draw the shooter
  function drawShooter(x, y) {
    context.beginPath();
    context.rect(x, y, shooterWidth, shooterHeight);
    context.fillStyle = shooterColor;
    context.fill();
    context.closePath();
  }

  // Draw a bullet
  function drawBullet(x, y) {
    context.beginPath();
    context.arc(x, y, bulletRadius, 0, Math.PI * 2);
    context.fillStyle = bulletColor;
    context.fill();
    context.closePath();
  }

  // Draw the score
  function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = '#000';
    context.fillText('Score: ' + score, 8, 20);
  }

  // Draw the remaining lives
  function drawLives() {
    context.font = '16px Arial';
    context.fillStyle = '#000';
    context.fillText('Lives: ' + lives, canvas.width - 80, 20);
  }

  // Draw the game over screen
  function drawGameOver() {
    context.font = '36px Arial';
    context.fillStyle = '#000';
    context.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
  }

  // Initialize the game
  function init() {
    // Set canvas dimensions based on screen size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Register key event listeners
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    // Start the game loop
    setInterval(function () {
      update();
      render();
    }, 10);
  }

  return {
    init: init,
  };
}

// Create the game instance
var game = new Game('canvas');
game.init();
