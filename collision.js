// Check collision between two bubbles
export function checkBubbleCollision(bubbleA, bubbleB) {
  const dx = bubbleA.x - bubbleB.x;
  const dy = bubbleA.y - bubbleB.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < bubbleA.radius + bubbleB.radius;
}

// Check collision between a bubble and the game boundaries
export function checkBoundaryCollision(bubble, gameWidth, gameHeight) {
  const { x, y, radius } = bubble;
  return (
    x - radius < 0 ||
    x + radius > gameWidth ||
    y - radius < 0 ||
    y + radius > gameHeight
  );
}

// Check collision between a bubble and the shooter
export function checkShooterCollision(bubble, shooter) {
  const dx = bubble.x - shooter.x;
  const dy = bubble.y - shooter.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < bubble.radius + shooter.radius;
}
