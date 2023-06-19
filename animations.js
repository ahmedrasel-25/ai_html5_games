export function animateBubble(bubble, targetX, targetY, duration) {
  return new Promise((resolve) => {
    const startX = bubble.x;
    const startY = bubble.y;
    const distanceX = targetX - startX;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    function updateAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const nextX = startX + distanceX * progress;
      const nextY = startY + distanceY * progress;

      bubble.x = nextX;
      bubble.y = nextY;

      if (progress < 1) {
        requestAnimationFrame(updateAnimation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(updateAnimation);
  });
}

export function animateScore(scoreElement, duration) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const startOpacity = 1;
    const endOpacity = 0;

    function updateAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const opacity = interpolate(startOpacity, endOpacity, progress);

      scoreElement.style.opacity = opacity;

      if (progress < 1) {
        requestAnimationFrame(updateAnimation);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(updateAnimation);
  });
}

function interpolate(startValue, endValue, progress) {
  return startValue + (endValue - startValue) * progress;
}
